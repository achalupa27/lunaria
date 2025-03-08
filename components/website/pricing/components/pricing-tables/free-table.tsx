'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useSubscriptionManagement } from '@/components/website/pricing/hooks/use-subscription-management';
import { getButtonConfig } from '../../utils/pricing-utils';
import { SubscriptionChangeDialog } from '../subscription-change-dialog';
import { freeFeatures } from '../../data/features.config';

type Props = {
    onSignUpClick: () => void;
};

const FreeTable = ({ onSignUpClick }: Props) => {
    const { subscription, showDialog, setShowDialog, handleSubscriptionChange: handleChange, handleAction: handleButtonAction } = useSubscriptionManagement();

    const buttonConfig = getButtonConfig({ currentRole: subscription?.role || null, tablePlan: 'free' });

    // User confirms they want to change their subscription in the dialog
    const handleSubscriptionChange = async () => {
        await handleChange(buttonConfig.action as 'upgrade' | 'downgrade', 'free');
    };

    // User clicks the table button to change their subscription
    const handleAction = () => {
        handleButtonAction(buttonConfig.action, '', onSignUpClick);
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
