'use client';

import { Button } from '@/components/ui/button';
import { MONTHLY_PREMIUM_PRICE, PREMIUM_MONTHLY_PRICE_ID, YEARLY_PREMIUM_PRICE, PREMIUM_YEARLY_PRICE_ID } from '@/constants';
import { CheckCircle } from 'lucide-react';
import { useSubscriptionManagement } from '@/components/website/pricing/hooks/use-subscription-management';
import { getButtonConfig } from '../../utils/pricing-utils';
import { SubscriptionChangeDialog } from '../subscription-change-dialog';
import { premiumFeatures } from '../../config/features.config';

type Props = {
    term: TermType;
    onSignUpClick: () => void;
};

const PremiumTable = ({ term, onSignUpClick }: Props) => {
    const priceId = term === 'Monthly' ? PREMIUM_MONTHLY_PRICE_ID : PREMIUM_YEARLY_PRICE_ID;
    const termPrice = term === 'Monthly' ? MONTHLY_PREMIUM_PRICE : YEARLY_PREMIUM_PRICE;

    const { subscription, showDialog, setShowDialog, handleSubscriptionChange: handleChange, handleAction: handleButtonAction } = useSubscriptionManagement();

    const buttonConfig = getButtonConfig({ currentRole: subscription?.role || null, tablePlan: 'premium', trialEnd: subscription?.trial_end, currentInterval: subscription?.interval as BillingInterval, tableTerm: term });

    // User confirms they want to change their subscription in the dialog
    const handleSubscriptionChange = async () => {
        await handleChange(buttonConfig.action as 'upgrade' | 'downgrade' | 'switch-term', 'premium', term.toLowerCase() as 'monthly' | 'yearly', priceId);
    };

    // User clicks the table button to change their subscription
    const handleAction = () => {
        handleButtonAction(buttonConfig.action, priceId, onSignUpClick);
    };

    return (
        <>
            <div className='gold-gradient relative flex h-[36rem] w-full sm:w-[20rem] xl:w-[21rem] 2xl:w-[22rem] flex-col rounded-2xl border border-orange-200 p-1 dark:bg-black dark:text-black'>
                <div className='absolute left-0 top-0 -z-10 flex h-[36rem] w-full sm:w-[20rem] xl:w-[21rem] 2xl:w-[22rem] flex-col rounded-2xl bg-orange-100 blur' />

                <div className='mx-auto mt-4 text-center'>
                    <div className='text-4xl font-semibold'>Premium</div>
                    <div className='text-lg'>{`$${termPrice} per ${term}`}</div>
                </div>
                <div className='grow px-6 pt-4'>
                    {premiumFeatures.map((feature, i) => (
                        <div key={i} className='flex items-center gap-2 text-sm leading-8 sm:text-base sm:leading-8'>
                            <CheckCircle size={18} className='text-black' /> <div>{feature}</div>
                        </div>
                    ))}
                </div>
                <Button onClick={handleAction} disabled={buttonConfig.disabled} className='rounded-b-xl' size='lg'>
                    {buttonConfig.text}
                </Button>
            </div>
            <SubscriptionChangeDialog isOpen={showDialog} onClose={() => setShowDialog(false)} onConfirm={handleSubscriptionChange} currentPlan={subscription?.role || 'free'} newPlan='premium' action={buttonConfig.action as 'upgrade' | 'downgrade' | 'switch-term'} term={term as 'Monthly' | 'Yearly'} currentTerm={subscription?.interval === 'month' ? 'Monthly' : 'Yearly'} />
        </>
    );
};

export default PremiumTable;
