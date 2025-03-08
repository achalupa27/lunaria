import { useState } from 'react';
import { useUser } from '../../../../hooks/use-user';
import handleNewSubscription from '@/components/website/pricing/services/new-subscription-service';
import handleUpdateSubscription from '@/components/website/pricing/services/update-subscription-service';
import handleCancelSubscription from '@/components/website/pricing/services/cancel-subscription-service';

type PlanType = 'free' | 'pro' | 'premium';

export const useSubscriptionManagement = () => {
    const { subscription, hasActiveSubscription } = useUser();
    const [showDialog, setShowDialog] = useState(false);

    // Handle subscription changes (upgrade, downgrade, switch term)
    const handleSubscriptionChange = async (action: 'upgrade' | 'downgrade' | 'switch-term', plan: PlanType, term?: 'monthly' | 'yearly', priceId?: string) => {
        if (action === 'switch-term' && term) {
            await handleUpdateSubscription(plan, term);
        } else if (action === 'downgrade') {
            if (plan === 'free' && subscription?.stripe_subscription_id) {
                await handleCancelSubscription(subscription.stripe_subscription_id);
            } else {
                await handleUpdateSubscription(plan, term);
            }
        } else if (action === 'upgrade') {
            if (hasActiveSubscription) {
                // Update existing subscription
                await handleUpdateSubscription(plan, term);
            } else if (priceId && subscription?.stripe_customer_id) {
                // Create new subscription
                await handleNewSubscription(priceId, subscription.stripe_customer_id);
            }
        }
        setShowDialog(false);
    };

    // Handle button click action
    const handleAction = (action: string, priceId: string, onSignUpClick: () => void) => {
        if (action === 'sign-up') {
            onSignUpClick();
        } else if (action === 'upgrade' && !hasActiveSubscription) {
            // Direct checkout for users without an active subscription
            if (subscription?.stripe_customer_id) {
                handleNewSubscription(priceId, subscription.stripe_customer_id);
            }
        } else {
            // Show dialog for existing subscribers or other actions
            setShowDialog(true);
        }
    };

    return {
        subscription,
        showDialog,
        setShowDialog,
        hasActiveSubscription,
        handleSubscriptionChange,
        handleAction,
    };
};
