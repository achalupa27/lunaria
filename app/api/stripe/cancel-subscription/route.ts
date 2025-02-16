import { createClient } from '@/utils/supabase/server';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    try {
        const { subscriptionId } = await req.json();

        if (!subscriptionId) {
            return new Response('Missing subscription ID', { status: 400 });
        }

        // Cancel the subscription at period end
        const subscription = await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true,
        });

        return new Response(JSON.stringify({ subscription }));
    } catch (error) {
        console.error('Error canceling subscription:', error);
        return new Response('Error canceling subscription', { status: 500 });
    }
}
