'use client';

import { Button } from '@/components/ui/button';
import { MONTHLY_PRO_PRICE, PRO_MONTHLY_PRICE_ID, PRO_YEARLY_PRICE_ID, YEARLY_PRO_PRICE } from '@/constants';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useSubscription } from '@/hooks/use-subscription';
import { getButtonConfig, BillingInterval } from '../../utils/pricing-utils';
import { SubscriptionChangeDialog } from '../subscription-change-dialog';
import { proFeatures } from '../../data/features.config';

type Props = {
    term: string;
    onSignUpClick: () => void;
};

const ProTable = ({ term, onSignUpClick }: Props) => {
    const { subscription } = useSubscription();
    const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        async function getSession() {
            const { data, error } = await supabase.auth.getSession();
            const user = data?.session?.user;

            if (user) {
                const { data: subscription } = await supabase.from('subscriptions').select('stripe_customer_id').eq('id', user.id).single();
                if (subscription?.stripe_customer_id) {
                    setStripeCustomerId(subscription.stripe_customer_id);
                }
            }
        }

        getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setStripeCustomerId(session.user.stripe_customer_id);
            }
        });

        return () => subscription.unsubscribe();
    }, [supabase.auth]);

    const buttonConfig = getButtonConfig(subscription?.role || null, 'pro', subscription?.trial_end, subscription?.interval as BillingInterval, term as 'Monthly' | 'Yearly');

    const handleSubscriptionChange = async () => {
        if (buttonConfig.action === 'switch-term') {
            try {
                const response = await fetch('/api/stripe/update-subscription', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        plan: 'pro',
                        term: term.toLowerCase(),
                    }),
                });
                if (response.ok) window.location.reload();
            } catch (error) {
                console.error('Error updating subscription term:', error);
            }
        } else if (buttonConfig.action === 'downgrade') {
            if (subscription?.role === 'premium') {
                try {
                    const response = await fetch('/api/stripe/update-subscription', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ plan: 'pro' }),
                    });
                    if (response.ok) window.location.reload();
                } catch (error) {
                    console.error('Error updating subscription:', error);
                }
            }
        } else if (buttonConfig.action === 'upgrade') {
            await handleCheckout(term === 'Monthly' ? PRO_MONTHLY_PRICE_ID : PRO_YEARLY_PRICE_ID);
        }
        setShowDialog(false);
    };

    const handleAction = () => {
        if (buttonConfig.action === 'sign-up') onSignUpClick();
        else setShowDialog(true);
    };

    const handleCheckout = async (priceId: string) => {
        if (!stripeCustomerId) return;

        try {
            const response = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId,
                    customerId: stripeCustomerId,
                }),
            });

            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            console.error('Error creating checkout session:', error);
        }
    };

    return (
        <>
            <div className='relative flex h-[36rem] w-full sm:w-[20rem] xl:w-[21rem] 2xl:w-[22rem] flex-col rounded-2xl border border-orange-100/60 bg-white p-1 dark:bg-black'>
                <div className='absolute left-0 top-0 -z-10 flex h-[36rem] w-full sm:w-[20rem] xl:w-[21rem] 2xl:w-[22rem] flex-col rounded-2xl dark:bg-orange-100/30 bg-orange-100 blur' />

                <div className='mx-auto mt-4 text-center'>
                    <div className='text-4xl font-semibold'>Pro</div>
                    <div className='text-lg'>{`$${term === 'Monthly' ? MONTHLY_PRO_PRICE : YEARLY_PRO_PRICE} per month`}</div>
                </div>
                <div className='grow px-6 pt-4'>
                    {proFeatures.map((feature, i) => (
                        <div key={i} className='flex items-center gap-2 text-sm leading-8 sm:text-base sm:leading-8'>
                            <CheckCircle size={18} className='text-green-400' />
                            <div>{feature}</div>
                        </div>
                    ))}
                </div>
                <Button onClick={handleAction} disabled={buttonConfig.disabled} className='rounded-b-xl' size='lg'>
                    {buttonConfig.text}
                </Button>
            </div>
            <SubscriptionChangeDialog isOpen={showDialog} onClose={() => setShowDialog(false)} onConfirm={handleSubscriptionChange} currentPlan={subscription?.role || 'free'} newPlan='pro' action={buttonConfig.action as 'upgrade' | 'downgrade' | 'switch-term'} term={term as 'Monthly' | 'Yearly'} currentTerm={subscription?.interval === 'month' ? 'Monthly' : 'Yearly'} />
        </>
    );
};

export default ProTable;
