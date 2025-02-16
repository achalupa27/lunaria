'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useSubscription } from '@/hooks/use-subscription';
import { getButtonConfig } from '../../utils/pricing-utils';
import { SubscriptionChangeDialog } from '../subscription-change-dialog';
import { useState } from 'react';
import { freeFeatures } from '../../data/features.config';

type Props = {
    onSignUpClick: () => void;
};

const FreeTable = ({ onSignUpClick }: Props) => {
    const { subscription } = useSubscription();
    const [showDialog, setShowDialog] = useState(false);
    const buttonConfig = getButtonConfig(subscription?.role || null, 'free');

    const handleSubscriptionChange = async () => {
        if (buttonConfig.action === 'downgrade') {
            try {
                const response = await fetch('/api/stripe/cancel-subscription', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) window.location.reload();
            } catch (error) {
                console.error('Error canceling subscription:', error);
            }
        }
        setShowDialog(false);
    };

    const handleAction = () => {
        if (buttonConfig.action === 'sign-up') onSignUpClick();
        else setShowDialog(true);
    };

    return (
        <>
            <div className='flex h-auto min-h-[36rem] sm:h-[36rem] w-full sm:w-[20rem] xl:w-[21rem] 2xl:w-[22rem] flex-col rounded-2xl border bg-white p-1 shadow dark:bg-black'>
                <div className='mx-auto mt-4 text-center'>
                    <div className='text-4xl'>Free</div>
                    <div className='text-base sm:text-lg'>No Credit Card required.</div>
                </div>
                <div className='grow px-6 pt-4'>
                    {freeFeatures.map((feature, i) => (
                        <div key={i} className='flex items-center gap-2 text-sm leading-8 sm:text-base sm:leading-8'>
                            <CheckCircle size={18} className='text-green-400' />
                            <div>{feature}</div>
                        </div>
                    ))}
                </div>
                <Button onClick={handleAction} disabled={buttonConfig.disabled} className='rounded-b-xl py-5'>
                    {buttonConfig.text}
                </Button>
            </div>
            <SubscriptionChangeDialog isOpen={showDialog} onClose={() => setShowDialog(false)} onConfirm={handleSubscriptionChange} currentPlan={subscription?.role || 'free'} newPlan='free' action={buttonConfig.action as 'upgrade' | 'downgrade'} term={'Monthly'} currentTerm={subscription?.interval === 'month' ? 'Monthly' : 'Yearly'} />
        </>
    );
};

export default FreeTable;
