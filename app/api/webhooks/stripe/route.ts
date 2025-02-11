import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

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
                const price = subscription.items.data[0].price;

                // Map price IDs to roles
                const role = price.id === process.env.STRIPE_PREMIUM_PRICE_ID ? 'premium' : 'pro';

                await supabase
                    .from('subscriptions')
                    .update({
                        role,
                        stripe_subscription_id: subscription.id,
                        status: subscription.status,
                        price_id: price.id,
                    })
                    .eq('stripe_customer_id', subscription.customer);
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
                    .eq('stripe_customer_id', deletedSubscription.customer);
                break;
        }
    } catch (error) {
        console.log(error);
        return new Response('Webhook handler failed', { status: 400 });
    }

    return new Response(JSON.stringify({ received: true }));
}
