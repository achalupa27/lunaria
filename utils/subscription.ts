import { createClient } from './supabase/server';

export async function getUserRole() {
    const supabase = await createClient();

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        return null;
    }

    const { data: subscription } = await supabase.from('subscriptions').select('role').eq('id', session.user.id).single();

    return subscription?.role || 'free';
}
