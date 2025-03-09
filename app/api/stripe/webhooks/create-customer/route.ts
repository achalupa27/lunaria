import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';
import { NextRequest } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    // Get the secret from searchParams instead of query
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('API_ROUTE_SECRET');

    if (secret !== process.env.API_ROUTE_SECRET) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        // Parse the JSON body
        const body = await req.json();
        const { email, id } = body.record;

        if (!email || !id) {
            return new Response('Missing required fields', { status: 400 });
        }

        // Create Stripe customer
        const customer = await stripe.customers.create({
            email,
            metadata: { supabaseUUID: id }, // Correct metadata syntax
        });

        // Create Supabase client and update the customer ID
        const supabase = await createClient();
        const { error } = await supabase.from('subscriptions').update({ stripe_customer_id: customer.id }).eq('id', id);

        if (error) {
            console.error('Supabase error:', error);
            return new Response('Database update failed', { status: 500 });
        }

        return new Response(JSON.stringify({ customerId: customer.id }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error creating customer:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
