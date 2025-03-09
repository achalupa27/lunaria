'use client';

import { Button } from '@/components/ui/button';
import { MONTHLY_PRO_PRICE, PRO_MONTHLY_PRICE_ID, PRO_YEARLY_PRICE_ID, YEARLY_PRO_PRICE } from '@/constants';
import { CheckCircle } from 'lucide-react';
import { useSubscriptionManagement } from '@/components/website/pricing/hooks/use-subscription-management';
import { getButtonConfig } from '../../utils/pricing-utils';
import { SubscriptionChangeDialog } from '../subscription-change-dialog';
import { proFeatures } from '../../config/features.config';

type Props = {
    term: TermType;
    onSignUpClick: () => void;
};

const ProTable = ({ term, onSignUpClick }: Props) => {
    const priceId = term === 'Monthly' ? PRO_MONTHLY_PRICE_ID : PRO_YEARLY_PRICE_ID;
    const termPrice = term === 'Monthly' ? MONTHLY_PRO_PRICE : YEARLY_PRO_PRICE;

    const { subscription, showDialog, setShowDialog, handleSubscriptionChange: handleChange, handleAction: handleButtonAction } = useSubscriptionManagement();

    const buttonConfig = getButtonConfig({ currentRole: subscription?.role || null, tablePlan: 'pro', trialEnd: subscription?.trial_end, currentInterval: subscription?.interval as BillingInterval, tableTerm: term as TermType });

    // User confirms they want to change their subscription in the dialog
    const handleSubscriptionChange = async () => {
        await handleChange(buttonConfig.action as 'upgrade' | 'downgrade' | 'switch-term', 'pro', term.toLowerCase() as 'monthly' | 'yearly', priceId);
    };

    // User clicks the table button to change their subscription
    const handleButtonClick = () => {
        handleButtonAction(buttonConfig.action, priceId, onSignUpClick);
    };

    return (
        <>
            <div className='relative flex h-[36rem] w-full sm:w-[20rem] xl:w-[21rem] 2xl:w-[22rem] flex-col rounded-2xl border border-orange-100 bg-white p-1 dark:bg-black dark:border-orange-200'>
                <div className='absolute left-0 top-0 -z-10 flex h-[36rem] w-full sm:w-[20rem] xl:w-[21rem] 2xl:w-[22rem] flex-col rounded-2xl dark:bg-orange-100/30 bg-orange-100 blur' />

                <div className='mx-auto mt-4 text-center'>
                    <div className='text-4xl font-semibold'>Pro</div>
                    <div className='text-lg'>{`$${termPrice} per ${term}`}</div>
                </div>
                <div className='grow px-6 pt-4'>
                    {proFeatures.map((feature, i) => (
                        <div key={i} className='flex items-center gap-2 text-sm leading-8 sm:text-base sm:leading-8'>
                            <CheckCircle size={18} className='text-green-400' />
                            <div>{feature}</div>
                        </div>
                    ))}
                </div>
                <Button onClick={handleButtonClick} disabled={buttonConfig.disabled} className='rounded-b-xl' size='lg'>
                    {buttonConfig.text}
                </Button>
            </div>
            <SubscriptionChangeDialog isOpen={showDialog} onClose={() => setShowDialog(false)} onConfirm={handleSubscriptionChange} currentPlan={subscription?.role || 'free'} newPlan='pro' action={buttonConfig.action as 'upgrade' | 'downgrade' | 'switch-term'} term={term as 'Monthly' | 'Yearly'} currentTerm={subscription?.interval === 'month' ? 'Monthly' : 'Yearly'} />
        </>
    );
};

export default ProTable;
