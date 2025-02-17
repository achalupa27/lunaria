import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useRole() {
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const supabase = createClient();

    useEffect(() => {
        async function getUserRole() {
            try {
                const {
                    data: { session },
                } = await supabase.auth.getSession();

                if (!session) {
                    setUserRole(null);
                    return;
                }

                const { data } = await supabase.from('subscriptions').select('role').eq('id', session.user.id).single();

                if (!data) {
                    setUserRole(null);
                    return;
                }

                setUserRole(data.role);
            } catch (error) {
                console.error('Error fetching subscription:', error);
            }
        }

        getUserRole();

        const {
            data: { subscription: authSubscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session) getUserRole();
            else setUserRole(null);
        });

        return () => {
            authSubscription.unsubscribe();
        };
    }, [supabase]);

    return { userRole };
}
