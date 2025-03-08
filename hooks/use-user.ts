import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export const useUser = () => {
    const [user, setUser] = useState<any>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

                if (sessionError) {
                    console.error('Error fetching session:', sessionError);
                    return;
                }

                const session = sessionData?.session;
                if (!session) {
                    setUser(null);
                    setSubscription(null);
                    return;
                }

                // Set the user
                setUser(session.user);

                // Get subscription data in a single query
                const { data: subscriptionData, error: subscriptionError } = await supabase.from('subscriptions').select('*').eq('id', session.user.id).single();

                if (subscriptionError) {
                    console.error('Error fetching subscription:', subscriptionError);
                    return;
                }

                setSubscription(subscriptionData);
            } catch (error) {
                console.error('Error in getUserData:', error);
            } finally {
                setLoading(false);
            }
        };

        getUserData();

        // Set up auth state change listener
        const {
            data: { subscription: authSubscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) {
                setUser(session.user);
                getUserData();
            } else {
                setUser(null);
                setSubscription(null);
            }
        });

        return () => {
            authSubscription.unsubscribe();
        };
    }, [supabase]);

    // Computed properties
    const role = subscription?.role || null;
    const hasActiveSubscription = subscription?.stripe_subscription_id && subscription.status === 'active';

    return {
        user,
        subscription,
        role,
        hasActiveSubscription,
        loading,
    };
};
