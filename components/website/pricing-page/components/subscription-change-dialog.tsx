'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    currentPlan: string;
    newPlan: string;
    action: 'upgrade' | 'downgrade';
};

export function SubscriptionChangeDialog({ isOpen, onClose, onConfirm, currentPlan, newPlan, action }: Props) {
    const title = action === 'upgrade' ? 'Upgrade Subscription' : 'Downgrade Subscription';
    const description = action === 'upgrade' ? 'You will be charged a prorated amount for the remainder of your billing period.' : 'Your current subscription benefits will continue until the end of your billing period.';

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription className='space-y-3'>
                        <p className='mt-3'>
                            Are you sure you want to {action} from {currentPlan} to {newPlan}?
                        </p>
                        <p>{description}</p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant='outline' onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant={action === 'upgrade' ? 'default' : 'destructive'} onClick={onConfirm}>
                        Confirm {action}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
