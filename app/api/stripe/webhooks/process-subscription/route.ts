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

// Add type guard for Stripe Customer
function isFullCustomer(customer: Stripe.Customer | Stripe.DeletedCustomer): customer is Stripe.Customer {
    return (customer as Stripe.Customer).metadata !== undefined;
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
        event = stripe.webhooks.constructEvent(body, signature, 'whsec_MH4W6guLS6nGw4OrQFwQoAijcq6Uxf7W');
    } catch (error: any) {
        return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const supabase = await createClient();

    try {
        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'invoice.paid':
            case 'invoice.payment_succeeded':
                const subscription = event.data.object as Stripe.Subscription;
                const productId = subscription.items.data[0].price.product as string;
                const role = isKnownProduct(productId) ? PRODUCT_TO_ROLE[productId] : 'free';

                // console.log('Webhook event type:', event.type);
                // console.log('Subscription status:', subscription.status);
                // console.log('Full subscription object:', JSON.stringify(subscription, null, 2));

                // console.log('customer: ', customer);
                // console.log('subscription: ', subscription);
                // console.log('subscription items: ', subscription.items.data[0]);

                const { error } = await supabase
                    .from('subscriptions')
                    .update({
                        role,
                        stripe_subscription_id: subscription.id,
                        status: subscription.status,
                        price_id: subscription.items.data[0].price.id,
                        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
                        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                        cancel_at_period_end: subscription.cancel_at_period_end,
                        cancel_at: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
                        canceled_at: subscription.canceled_at ? new Date(subscription.canceled_at * 1000).toISOString() : null,
                        trial_start: subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
                        trial_end: subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
                        interval: subscription.items.data[0].price.recurring?.interval,
                        interval_count: subscription.items.data[0].price.recurring?.interval_count,
                        price_amount: subscription.items.data[0].price.unit_amount,
                        currency: subscription.currency,
                    })
                    .eq('stripe_customer_id', subscription.customer);

                if (error) {
                    console.error('Supabase update error:', error);
                    return new Response('Database update failed', { status: 500 });
                }
                break;

            case 'customer.subscription.deleted':
                const deletedSubscription = event.data.object as Stripe.Subscription;

                await supabase
                    .from('subscriptions')
                    .update({
                        role: 'free',
                        stripe_subscription_id: null,
                        status: 'canceled',
                        price_id: null,
                    })
                    .eq('stripe_customer_id', deletedSubscription.customer); // Changed from 'id' to 'stripe_customer_id'
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
