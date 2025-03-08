'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    currentPlan: string;
    newPlan: string;
    action: 'upgrade' | 'downgrade' | 'switch-term';
    term: 'Monthly' | 'Yearly';
    currentTerm?: 'Monthly' | 'Yearly';
};

export const SubscriptionChangeDialog = ({ isOpen, onClose, onConfirm, currentPlan, newPlan, action, term, currentTerm }: Props) => {
    const title = action === 'switch-term' ? 'Change Billing Cycle' : action === 'upgrade' ? 'Upgrade Subscription' : 'Downgrade Subscription';

    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const description = action === 'switch-term' ? `You will be switched to ${term} billing at the start of your next billing cycle.` : action === 'upgrade' ? 'You will be charged a prorated amount for the remainder of your billing period.' : 'Your current subscription benefits will continue until the end of your billing period.';

    const formatPlanText = (plan: string, termType?: TermType) => {
        const planText = capitalize(plan);
        return plan === 'free' ? planText : `${planText} ${termType}`;
    };

    const actionText = action === 'switch-term' ? `switch to ${term?.toLowerCase()} billing` : `${action} from ${formatPlanText(currentPlan, currentTerm)} to ${formatPlanText(newPlan, term)}`;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className='space-y-3'>
                        <p className='mt-3'>Are you sure you want to {actionText}?</p>
                        <p>{description}</p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant='outline' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant={action === 'upgrade' ? 'default' : 'destructive'} onClick={onConfirm}>
                        Confirm {action === 'switch-term' ? 'Change' : action}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
