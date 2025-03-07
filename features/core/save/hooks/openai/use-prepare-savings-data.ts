import { format } from 'date-fns';
import { useMemo } from 'react';

type PreparedSavingsData = {
    savingsData: string;
    tokenCount: number;
};

export const usePrepareSavingsData = (saves: Save[] | undefined, savingsAccounts: SavingsAccount[] | undefined, debtAccounts: DebtAccount[] | undefined, totalSavings: number, totalDebt: number): PreparedSavingsData => {
    return useMemo(() => {
        if (!saves || !savingsAccounts || !debtAccounts) {
            return { savingsData: '', tokenCount: 0 };
        }

        // Calculate monthly savings trends
        const monthlySavings = saves.reduce(
            (acc, save) => {
                const monthKey = format(new Date(save.date), 'MMM yyyy');
                if (!acc[monthKey]) {
                    acc[monthKey] = { deposits: 0, withdrawals: 0 };
                }
                if (save.type === 'Deposit') {
                    acc[monthKey].deposits += save.amount;
                } else {
                    acc[monthKey].withdrawals += save.amount;
                }
                return acc;
            },
            {} as Record<string, { deposits: number; withdrawals: number }>
        );

        // Helper function to safely convert value to string
        const safeString = (value: any): string => value ?? '';

        // Convert data to CSV-like format
        const savingsTransactions = ['SAVINGS TRANSACTIONS', 'date,amount,type', ...saves.map((save) => [safeString(save.date), safeString(save.amount), safeString(save.type)].join(','))];

        const monthlyTrendsData = [
            'MONTHLY TRENDS',
            'month,deposits,withdrawals,netSavings',
            ...Object.entries(monthlySavings).map(([month, data]) => {
                const netSavings = data.deposits - data.withdrawals;
                return `${month},${data.deposits},${data.withdrawals},${netSavings}`;
            }),
        ];

        const savingsAccountsData = ['SAVINGS ACCOUNTS', 'name,balance', ...savingsAccounts.map((account) => `${safeString(account.name)},${safeString(account.balance)}`)];

        const debtAccountsData = ['DEBT ACCOUNTS', 'name,balance', ...debtAccounts.map((account) => `${safeString(account.name)},${safeString(account.current_balance)}`)];

        const netWorth = totalSavings - totalDebt;
        const savingsToDebtRatio = totalDebt > 0 ? totalSavings / totalDebt : 'N/A';

        const summaryData = ['SAVINGS SUMMARY', `Total Savings,${totalSavings}`, `Total Debt,${totalDebt}`, `Net Worth,${netWorth}`, `Savings-to-Debt Ratio,${typeof savingsToDebtRatio === 'number' ? savingsToDebtRatio.toFixed(2) : savingsToDebtRatio}`];

        // Combine all data sections
        const combinedData = [...savingsTransactions, '', ...monthlyTrendsData, '', ...savingsAccountsData, '', ...debtAccountsData, '', ...summaryData].join('\n');

        return {
            savingsData: combinedData,
            tokenCount: Math.ceil(combinedData.length / 4),
        };
    }, [saves, savingsAccounts, debtAccounts, totalSavings, totalDebt]);
};
