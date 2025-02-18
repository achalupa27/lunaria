'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';
import Card from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Link from 'next/link';
import Image from 'next/image';

type Subscription = {
    id: string;
    user_id: string;
    role: 'free' | 'pro' | 'premium';
    status: 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid';
    price_id: string | null;
    stripe_customer_id: string;
    stripe_subscription_id: string | null;
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
    cancel_at: string | null;
    canceled_at: string | null;
    trial_start: string | null;
    trial_end: string | null;
    interval: 'month' | 'year';
    interval_count: number;
    price_amount: number;
    currency: string;
};

// Helper function for date formatting
const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
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

    const handleCancelSubscription = async () => {
        if (!subscription?.stripe_subscription_id) return;

        try {
            const response = await fetch('/api/stripe/cancel-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subscriptionId: subscription.stripe_subscription_id,
                }),
            });

            if (!response.ok) throw new Error('Failed to cancel subscription');

            // Refresh subscription data
            const { data: subscriptionData } = await supabase.from('subscriptions').select('*').eq('id', session?.user?.id).single();

            setSubscription(subscriptionData);
        } catch (error) {
            console.error('Error canceling subscription:', error);
        }
    };

    return (
        <section className='max-w-2xl mx-auto p-6 space-y-6 mt-12'>
            <Card className='flex flex-row items-center space-x-4 border-2 shadow-md relative'>
                {session?.user?.user_metadata.avatar_url ? (
                    <Image src={session.user.user_metadata.avatar_url} alt='Profile' className='w-16 h-16 rounded-full' width={64} height={64} />
                ) : (
                    <div className='w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center'>
                        <span className='text-2xl text-zinc-600 dark:text-zinc-400'>{(session?.user?.user_metadata.full_name?.[0] || session?.user?.user_metadata.name?.[0] || session?.user?.email?.[0] || '?').toUpperCase()}</span>
                    </div>
                )}
                <div>
                    <h1 className='text-2xl font-bold'>{session?.user?.user_metadata.full_name || session?.user?.user_metadata.name || (session?.user?.email ? session.user.email.split('@')[0] : 'No name provided')}</h1>
                    <p className='text-zinc-600 dark:text-zinc-400'>{session?.user?.email || 'No email provided'}</p>
                </div>
                <div className='absolute top-4 right-4'>
                    {subscription?.role === 'premium' && <span className='px-2 py-1 gold-gradient rounded-lg text-sm border border-orange-100 shadow font-semibold dark:text-zinc-900'>Premium</span>}
                    {subscription?.role === 'pro' && <span className='px-2 py-1 rounded-lg dark:bg-zinc-950 text-sm dark:text-orange-100 font-medium border border-orange-100 bg-white shadow'>Pro</span>}
                    {(!subscription?.role || subscription.role === 'free') && <span className='px-2 py-1 text-sm'>Free</span>}
                </div>
            </Card>

            {subscription && (
                <Card className='p-8 py-6'>
                    <h3 className='mb-4'>Subscription Details</h3>
                    <div className='grid grid-cols-2 gap-2 text-sm'>
                        <div className='text-zinc-600 dark:text-zinc-400'>Status</div>
                        <div className='capitalize'>{subscription.status}</div>

                        <div className='text-zinc-600 dark:text-zinc-400'>Plan</div>
                        <div className='capitalize'>{subscription.role}</div>

                        <div className='text-zinc-600 dark:text-zinc-400'>Price</div>
                        <div>
                            ${(subscription?.price_amount / 100).toFixed(2)} {subscription?.currency?.toUpperCase()} / {subscription?.interval}
                        </div>

                        <div className='text-zinc-600 dark:text-zinc-400'>Current Period</div>
                        <div>
                            {formatDate(subscription?.current_period_start)} - {formatDate(subscription?.current_period_end)}
                        </div>

                        {subscription.trial_end && (
                            <>
                                <div className='text-zinc-600 dark:text-zinc-400'>Trial Ends</div>
                                <div>{formatDate(subscription?.trial_end)}</div>
                            </>
                        )}

                        {/* Next Payment - only show if not cancelling */}
                        {!subscription.cancel_at_period_end && (
                            <>
                                <div className='text-zinc-600 dark:text-zinc-400'>Next Payment</div>
                                <div>
                                    {formatDate(subscription?.current_period_end)}
                                    <span className='text-zinc-500 dark:text-zinc-400 ml-1'>
                                        (${(subscription?.price_amount / 100).toFixed(2)} {subscription?.currency?.toUpperCase()})
                                    </span>
                                </div>
                            </>
                        )}

                        {/* Cancels On - show when cancelling at period end */}
                        {subscription.cancel_at_period_end && (
                            <>
                                <div className='text-zinc-600 dark:text-zinc-400'>Cancels On</div>
                                <div>{formatDate(subscription?.current_period_end)}</div>
                            </>
                        )}

                        {/* Cancelled On - show when immediately cancelled */}
                        {subscription.canceled_at && !subscription.cancel_at_period_end && (
                            <>
                                <div className='text-zinc-600 dark:text-zinc-400'>Cancelled On</div>
                                <div>{formatDate(subscription?.canceled_at)}</div>
                            </>
                        )}
                    </div>

                    {/* Trial warning message */}
                    {subscription?.trial_end && !subscription?.cancel_at_period_end && (
                        <div className='mt-4 text-sm text-zinc-600 dark:text-zinc-400 border-t pt-4'>
                            <p>
                                Cancel <span className='font-bold'>before {formatDate(subscription?.trial_end)}</span> to avoid being charged ${(subscription?.price_amount / 100).toFixed(2)} {subscription?.currency.toUpperCase()}.
                            </p>
                            <p className='mt-2'>If you need help cancelling your subscription, please reach out to us and we&apos;ll be happy to assist you.</p>
                        </div>
                    )}

                    {/* Cancellation confirmation message and reactivate button */}
                    {subscription?.cancel_at_period_end && (
                        <>
                            <div className='mt-4 text-sm text-zinc-600 dark:text-zinc-400 border-t pt-4'>Your subscription will remain active until {formatDate(subscription?.current_period_end)}. You won&apos;t be charged again after this date.</div>
                            <Button variant='outline' className='w-full mt-4 font-medium dark:text-green-400 text-green-500  border-green-400 hover:bg-green-100 hover:text-green-600 dark:border-green-400 dark:hover:bg-green-950/70 dark:hover:text-green-300' onClick={() => router.push('/pricing')}>
                                Reactivate Subscription
                            </Button>
                        </>
                    )}

                    {subscription && subscription?.status !== 'canceled' && !subscription?.cancel_at_period_end && (
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant='outline' className='w-full mt-4 text-red-500 border-red-200 hover:bg-red-50 dark:hover:bg-red-950/60 hover:text-red-600 dark:border-red-600 dark:hover:text-red-400'>
                                    Cancel Subscription
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
                                    <AlertDialogDescription>Are you sure you want to cancel your subscription? You&apos;ll continue to have access until the end of your current billing period ({formatDate(subscription?.current_period_end)}).</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleCancelSubscription} className='bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 dark:text-white'>
                                        Yes, Cancel
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}

                    <Button asChild variant='outline' className='w-full mt-2'>
                        <Link href='/pricing'>Switch Plan</Link>
                    </Button>
                </Card>
            )}

            <Card className='p-8 py-6'>
                <h3 className='mb-4'>Account Details</h3>
                <div className='grid grid-cols-2 gap-2 text-sm'>
                    <div className='text-zinc-600 dark:text-zinc-400'>Member since</div>
                    <div>{formatDate(session?.user?.created_at || null)}</div>

                    <div className='text-zinc-600 dark:text-zinc-400'>Last sign in</div>
                    <div>{formatDate(session?.user?.last_sign_in_at || null)}</div>
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
