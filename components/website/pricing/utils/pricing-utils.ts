type ButtonConfig = {
    action: 'sign-up' | 'upgrade' | 'downgrade' | 'switch-term' | 'current';
    text: string;
    disabled: boolean;
};

type ButtonConfigProps = {
    currentRole: PlanType | null;
    tablePlan: PlanType;
    trialEnd?: string | null;
    currentInterval?: BillingInterval;
    tableTerm?: TermType;
};

export const getButtonConfig = ({ currentRole, tablePlan, trialEnd, currentInterval, tableTerm }: ButtonConfigProps): ButtonConfig => {
    if (!currentRole) {
        return {
            action: 'sign-up',
            text: 'Sign Up',
            disabled: false,
        };
    }

    if (currentRole === tablePlan) {
        // Check if we need to show term switch option
        if (currentInterval && tableTerm) {
            const tableInterval = tableTerm === 'Monthly' ? 'month' : 'year';
            if (currentInterval !== tableInterval) {
                return {
                    action: 'switch-term',
                    text: `Switch to ${tableTerm} Billing`,
                    disabled: false,
                };
            }
        }
        return {
            action: 'current',
            text: 'Current Plan',
            disabled: true,
        };
    }

    const planRanking = { free: 0, pro: 1, premium: 2 };
    const isUpgrade = planRanking[tablePlan] > planRanking[currentRole];

    if (isUpgrade) {
        const hasUsedTrial = trialEnd !== null;
        return {
            action: 'upgrade',
            text: hasUsedTrial ? 'Upgrade' : 'Start Trial',
            disabled: false,
        };
    }

    return {
        action: 'downgrade',
        text: 'Downgrade',
        disabled: false,
    };
};
