import { createClient } from '@/utils/supabase/server';
import Stripe from 'stripe';
import { PREMIUM_MONTHLY_PRICE_ID, PREMIUM_YEARLY_PRICE_ID, PRO_MONTHLY_PRICE_ID, PRO_YEARLY_PRICE_ID } from '@/constants';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Map of plans to their price IDs
const PLAN_PRICES = {
    pro: {
        monthly: PRO_MONTHLY_PRICE_ID,
        yearly: PRO_YEARLY_PRICE_ID,
    },
    premium: {
        monthly: PREMIUM_MONTHLY_PRICE_ID,
        yearly: PREMIUM_YEARLY_PRICE_ID,
    },
} as const;

export async function POST(req: Request) {
    try {
        const { plan, term } = await req.json();

        // Get the user's session
        const supabase = await createClient();
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
            return new Response('Unauthorized', { status: 401 });
        }

        // Get the user's current subscription
        const { data: subscriptionData } = await supabase.from('subscriptions').select('stripe_subscription_id, price_id').eq('id', session.user.id).single();

        if (!subscriptionData?.stripe_subscription_id) {
            return new Response('No active subscription found', { status: 400 });
        }

        // Get current subscription from Stripe
        const subscription = await stripe.subscriptions.retrieve(subscriptionData.stripe_subscription_id);

        // Determine interval (monthly or yearly)
        let interval = 'monthly';

        // If term is specified, use it
        if (term) {
            interval = term === 'yearly' ? 'yearly' : 'monthly';
        } else {
            // Otherwise use the current interval
            const currentInterval = subscription.items.data[0].price.recurring?.interval;
            interval = currentInterval === 'year' ? 'yearly' : 'monthly';
        }

        // Get new price ID based on plan and interval
        const newPriceId = PLAN_PRICES[plan as keyof typeof PLAN_PRICES][interval as 'monthly' | 'yearly'];

        if (!newPriceId) {
            return new Response('Invalid plan specified', { status: 400 });
        }

        // Update the subscription
        const updatedSubscription = await stripe.subscriptions.update(subscription.id, {
            items: [
                {
                    id: subscription.items.data[0].id,
                    price: newPriceId,
                },
            ],
            proration_behavior: 'create_prorations',
        });

        return new Response(JSON.stringify({ subscription: updatedSubscription }));
    } catch (error) {
        console.error('Error updating subscription:', error);
        return new Response(JSON.stringify({ error: 'Error updating subscription' }), { status: 500 });
    }
}
