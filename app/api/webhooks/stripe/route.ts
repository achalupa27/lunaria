import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { PREMIUM_MONTHLY_ID, PREMIUM_YEARLY_ID, PRO_MONTHLY_ID, PRO_YEARLY_ID } from '@/constants';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Create a mapping of product IDs to roles
const PRODUCT_TO_ROLE = {
    [PREMIUM_MONTHLY_ID]: 'premium',
    [PREMIUM_YEARLY_ID]: 'premium',
    [PRO_MONTHLY_ID]: 'pro',
    [PRO_YEARLY_ID]: 'pro',
} as const;

// Add type guard
function isKnownProduct(productId: string): productId is keyof typeof PRODUCT_TO_ROLE {
    return productId in PRODUCT_TO_ROLE;
}

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature') as string;

    if (!signature) {
        return new Response('No signature found', { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error: any) {
        return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const supabase = await createClient();

    try {
        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
                const subscription = event.data.object as Stripe.Subscription;
                const productId = subscription.items.data[0].price.product as string;

                const role = isKnownProduct(productId) ? PRODUCT_TO_ROLE[productId] : 'free';
                console.log('role', role);

                // Get the Supabase UUID from Stripe metadata
                const supabaseUUID = (subscription.customer as Stripe.Customer).metadata.supabaseUUID;

                await supabase
                    .from('subscriptions')
                    .update({
                        role,
                        stripe_subscription_id: subscription.id,
                        status: subscription.status,
                        price_id: subscription.items.data[0].price.id,
                    })
                    .eq('id', supabaseUUID);
                break;

            case 'customer.subscription.deleted':
                const deletedSubscription = event.data.object as Stripe.Subscription;
                console.log('deletedSubscription', deletedSubscription);

                await supabase
                    .from('subscriptions')
                    .update({
                        role: 'free',
                        stripe_subscription_id: null,
                        status: 'canceled',
                        price_id: null,
                    })
                    .eq('stripe_customer_id', deletedSubscription.customer);
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error('Webhook verification failed:', error);
        return new Response(`Webhook Error: ${error}`, { status: 400 });
    }

    return new Response(JSON.stringify({ received: true }));
}
