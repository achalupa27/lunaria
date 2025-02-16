'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';
import Card from '@/components/ui/card';

type Subscription = {
    id: string;
    user_id: string;
    status: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid';
    price_id: string;
    quantity: number;
    cancel_at_period_end: boolean;
    created: string;
    current_period_start: string;
    current_period_end: string;
    ended_at: string | null;
    cancel_at: string | null;
    canceled_at: string | null;
    trial_start: string | null;
    trial_end: string | null;
};

const ProfilePage = () => {
    const supabase = createClient();
    const router = useRouter();
    const [session, setSession] = useState<Session | null>(null);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    useEffect(() => {
        const getSessionAndSubscription = async () => {
            // Get session
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session);

            if (session?.user) {
                // Get subscription data
                const { data: subscriptionData, error } = await supabase.from('subscriptions').select('*').eq('id', session.user.id).single();

                if (error) {
                    console.error('Error fetching subscription:', error);
                    return;
                }
                console.log(subscriptionData);
                setSubscription(subscriptionData);
            }
        };
        getSessionAndSubscription();
    }, [supabase.auth]);

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
            return;
        }
        router.refresh();
        router.push('/'); // Redirect to home page after sign out
    };
    return (
        <section className='max-w-2xl mx-auto p-6 space-y-6 mt-12'>
            <div className='flex items-center space-x-4'>
                {session?.user?.user_metadata.avatar_url ? (
                    <img src={session.user.user_metadata.avatar_url} alt='Profile' className='w-16 h-16 rounded-full' />
                ) : (
                    <div className='w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center'>
                        <span className='text-2xl text-zinc-500'>{(session?.user?.user_metadata.full_name?.[0] || session?.user?.user_metadata.name?.[0] || session?.user?.email?.[0] || '?').toUpperCase()}</span>
                    </div>
                )}
                <div>
                    <h1 className='text-2xl font-bold'>{session?.user?.user_metadata.full_name || session?.user?.user_metadata.name || (session?.user?.email ? session.user.email.split('@')[0] : 'No name provided')}</h1>
                    <p className='text-zinc-600'>{session?.user?.email || 'No email provided'}</p>
                </div>
            </div>

            {subscription && (
                <Card className='p-8 py-6'>
                    <h3 className='mb-4'>Subscription Details</h3>
                    <div className='grid grid-cols-2 gap-2 text-sm'>
                        <div className='text-zinc-600 dark:text-zinc-400'>Status</div>
                        <div className='capitalize'>
                            <span className={`px-2 py-1 rounded text-sm ${subscription.status === 'active' || subscription.status === 'trialing' ? 'bg-green-50 border border-green-400 text-green-500' : 'bg-yellow-50 border border-yellow-400 text-yellow-500'}`}>{subscription.status}</span>
                        </div>

                        <div className='text-zinc-600 dark:text-zinc-400'>Current Period</div>
                        <div>
                            {new Date(subscription.current_period_start).toLocaleDateString()} - {new Date(subscription.current_period_end).toLocaleDateString()}
                        </div>

                        {subscription.trial_end && (
                            <>
                                <div className='text-zinc-600 dark:text-zinc-400'>Trial Ends</div>
                                <div>{new Date(subscription.trial_end).toLocaleDateString()}</div>
                            </>
                        )}

                        {subscription.cancel_at && (
                            <>
                                <div className='text-zinc-600 dark:text-zinc-400'>Cancels On</div>
                                <div>{new Date(subscription.cancel_at).toLocaleDateString()}</div>
                            </>
                        )}
                    </div>
                </Card>
            )}

            <Card className='p-8 py-6'>
                <h3 className='mb-4'>Account Details</h3>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                    <div className='text-zinc-600 dark:text-zinc-400'>Member since</div>
                    <div>{new Date(session?.user?.created_at || '').toLocaleDateString()}</div>

                    <div className='text-zinc-600 dark:text-zinc-400'>Last sign in</div>
                    <div>{new Date(session?.user?.last_sign_in_at || '').toLocaleDateString()}</div>
                </div>
            </Card>

            <Card className='p-8 py-6'>
                <h3 className='mb-4'>Connected Accounts</h3>
                <div className='flex gap-2'>
                    {session?.user?.identities?.map((identity) => (
                        <span key={identity.identity_id} className='px-3 py-1.5 rounded-md text-sm bg-green-50 dark:bg-green-900/30 border border-green-400 dark:border-green-400 dark:text-green-400 text-green-500'>
                            {identity.provider.charAt(0).toUpperCase() + identity.provider.slice(1)} ✓
                        </span>
                    ))}
                </div>
            </Card>

            <Button onClick={handleSignOut} className='w-full' variant='destructive'>
                Sign Out
            </Button>

            {/* <pre className='mb-4 p-4 bg-zinc-100 rounded overflow-auto max-w-none'>{JSON.stringify(session, null, 2)}</pre> */}
        </section>
    );
};

export default ProfilePage;
