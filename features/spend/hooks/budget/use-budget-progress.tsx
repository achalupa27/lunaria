import { useEffect, useState } from 'react';

type BudgetProgress = {
    [key: string]: {
        spent: number;
        budget: number;
        period: 'weekly' | 'monthly' | 'yearly';
    };
};

export const useBudgetProgress = (spends: Spend[] | undefined, budgets: Budget[] | undefined) => {
    const [budgetProgress, setBudgetProgress] = useState<BudgetProgress>({});

    useEffect(() => {
        if (!spends || !budgets) {
            setBudgetProgress({});
            return;
        }

        const progress: BudgetProgress = {};

        // Initialize with budgets
        budgets.forEach((budget) => {
            progress[budget.category] = {
                spent: 0,
                budget: budget.amount,
                period: budget.period,
            };
        });

        // Calculate spending for current period
        spends.forEach((spend) => {
            const spendDate = new Date(spend.date);
            const now = new Date();

            if (progress[spend.category]) {
                const isCurrentPeriod =
                    progress[spend.category].period === 'weekly'
                        ? spendDate >= new Date(now.setDate(now.getDate() - 7)) // Last 7 days
                        : spendDate.getMonth() === now.getMonth(); // Current month

                if (isCurrentPeriod) {
                    progress[spend.category].spent += spend.cost;
                }
            }
        });

        setBudgetProgress(progress);
    }, [spends, budgets]);

    return budgetProgress;
};
