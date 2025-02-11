import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useSubscription() {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function getSubscription() {
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (!session) {
                    setSubscription(null);
                    return;
                }

                const { data } = await supabase.from('subscriptions').select('*').eq('id', session.user.id).single();

                setSubscription(data);
            } catch (error) {
                console.error('Error fetching subscription:', error);
            } finally {
                setLoading(false);
            }
        }

        getSubscription();

        const {
            data: { subscription: authSubscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                getSubscription();
            } else {
                setSubscription(null);
            }
        });

        return () => {
            authSubscription.unsubscribe();
        };
    }, [supabase]);

    return { subscription, loading };
}
