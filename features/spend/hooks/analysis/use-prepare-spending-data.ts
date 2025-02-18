import { useMemo } from 'react';

type PreparedSpendingData = {
    spendingData: string;
    tokenCount: number;
};

type SpendingTotals = {
    totalSpent: number;
    totalNeedSpent: number;
    totalWantSpent: number;
    totalWasteSpent: number;
};

type CategoryTotal = {
    category: string;
    total: number;
};

type BudgetProgress = {
    category: string;
    spent: number;
    budget: number;
};

export const usePrepareSpendingData = (spends: Spend[] | undefined, budgets: Budget[] | undefined, recurringExpenses: RecurringExpense[] | undefined, categoryTotals: Record<string, number>, budgetProgress: Record<string, { spent: number; budget: number }>, totals: SpendingTotals): PreparedSpendingData => {
    return useMemo(() => {
        if (!spends || !budgets || !recurringExpenses) {
            return { spendingData: '', tokenCount: 0 };
        }

        // Headers for each data type
        const spendHeaders = ['date', 'cost', 'category', 'item', 'store', 'necessity'];
        const budgetHeaders = ['category', 'amount', 'period'];
        const recurringHeaders = ['category', 'amount', 'name', 'period'];

        // Helper function to safely convert value to string
        const safeString = (value: any): string => value ?? '';

        // Convert data to CSV-like format
        const spendsData = ['SPENDING TRANSACTIONS', spendHeaders.join(','), ...spends.map((spend) => [safeString(spend.date), safeString(spend.cost), safeString(spend.category), safeString(spend.item), safeString(spend.store), safeString(spend.necessity)].join(','))];

        const budgetsData = ['BUDGETS', budgetHeaders.join(','), ...budgets.map((budget) => [safeString(budget.category), safeString(budget.amount), safeString(budget.period)].join(','))];

        const recurringData = ['RECURRING EXPENSES', recurringHeaders.join(','), ...recurringExpenses.map((expense) => [safeString(expense.category), safeString(expense.amount), safeString(expense.name), safeString(expense.period)].join(','))];

        // New data sections
        const categoryTotalsData = ['CATEGORY TOTALS', 'category,total', ...Object.entries(categoryTotals).map(([category, total]) => `${category},${total}`)];

        const budgetProgressData = ['BUDGET PROGRESS', 'category,spent,budget', ...Object.entries(budgetProgress).map(([category, data]) => `${category},${data.spent},${data.budget}`)];

        const spendingTotalsData = ['SPENDING TOTALS', `Total Spent,${totals.totalSpent}`, `Need Spending,${totals.totalNeedSpent}`, `Want Spending,${totals.totalWantSpent}`, `Waste Spending,${totals.totalWasteSpent}`];

        // Combine all data sections
        const combinedData = [...spendsData, '', ...budgetsData, '', ...recurringData, '', ...categoryTotalsData, '', ...budgetProgressData, '', ...spendingTotalsData].join('\n');

        return {
            spendingData: combinedData,
            tokenCount: Math.ceil(combinedData.length / 4),
        };
    }, [spends, budgets, recurringExpenses, categoryTotals, budgetProgress, totals]);
};
