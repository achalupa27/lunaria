'use client';

import { Button } from '@/components/ui/button';
import { MONTHLY_PREMIUM_PRICE, PREMIUM_MONTHLY_PRICE_ID, YEARLY_PREMIUM_PRICE, PREMIUM_YEARLY_PRICE_ID } from '@/constants';
import { CheckCircle } from 'lucide-react';
import { premiumFeatures } from '../../data/features-premium';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useSubscription } from '@/hooks/use-subscription';
import { getButtonConfig, BillingInterval } from '../../utils/pricing-utils';
import { SubscriptionChangeDialog } from '../subscription-change-dialog';

type Props = {
    term: string;
    onSignUpClick: () => void;
};

const PremiumTable = ({ term, onSignUpClick }: Props) => {
    const { subscription } = useSubscription();
    const [stripeCustomerId, setStripeCustomerId] = useState<string | null>(null);
    const supabase = createClient();
    const [showDialog, setShowDialog] = useState(false);

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

    const buttonConfig = getButtonConfig(subscription?.role || null, 'premium', subscription?.trial_end, subscription?.interval as BillingInterval, term);

    const handleSubscriptionChange = async () => {
        if (buttonConfig.action === 'switch-term') {
            try {
                const response = await fetch('/api/stripe/update-subscription', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        plan: 'premium',
                        term: term.toLowerCase(),
                    }),
                });
                if (response.ok) {
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error updating subscription term:', error);
            }
        } else if (buttonConfig.action === 'upgrade') {
            await handleCheckout(term === 'Monthly' ? PREMIUM_MONTHLY_PRICE_ID : PREMIUM_YEARLY_PRICE_ID);
        }
        setShowDialog(false);
    };

    const handleAction = () => {
        if (buttonConfig.action === 'sign-up') {
            onSignUpClick();
        } else {
            setShowDialog(true);
        }
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
            <div className='gold-gradient relative flex h-[36rem] w-full sm:w-[20rem] xl:w-[21rem] 2xl:w-[22rem] flex-col rounded-2xl border border-orange-200 p-1 dark:bg-black dark:text-black'>
                <div className='absolute left-0 top-0 -z-10 flex h-[36rem] w-full sm:w-[20rem] xl:w-[21rem] 2xl:w-[22rem] flex-col rounded-2xl bg-orange-100 blur' />

                <div className='mx-auto mt-4 text-center'>
                    <div className='text-4xl font-semibold'>Premium</div>
                    <div className='text-lg'>{`$${term === 'Monthly' ? MONTHLY_PREMIUM_PRICE : YEARLY_PREMIUM_PRICE} per month`}</div>
                </div>
                <div className='grow px-6 pt-4'>
                    {premiumFeatures.map((feature, i) => (
                        <div key={i} className='flex items-center gap-2 text-sm leading-8 sm:text-base sm:leading-8'>
                            <CheckCircle size={18} className='text-black' /> <div>{feature.feature}</div>
                        </div>
                    ))}
                </div>
                <Button onClick={handleAction} disabled={buttonConfig.disabled} className='rounded-b-xl' size='lg'>
                    {buttonConfig.text}
                </Button>
            </div>
            <SubscriptionChangeDialog isOpen={showDialog} onClose={() => setShowDialog(false)} onConfirm={handleSubscriptionChange} currentPlan={subscription?.role || 'free'} newPlan='premium' action={buttonConfig.action as 'upgrade' | 'downgrade'} />
        </>
    );
};

export default PremiumTable;
