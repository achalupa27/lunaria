import { createClient } from '@/utils/supabase/server';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    try {
        const { priceId, customerId } = await req.json();

        if (!priceId || !customerId) {
            return new Response('Missing required fields', { status: 400 });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            subscription_data: {
                trial_period_days: 7,
            },
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
        });

        return new Response(JSON.stringify({ url: session.url }));
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return new Response('Error creating checkout session', { status: 500 });
    }
}
