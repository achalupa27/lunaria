import { format } from 'date-fns';

export const usePrepareSavingsData = (saves: Save[] | undefined, savingsAccounts: SavingsAccount[] | undefined, debtAccounts: DebtAccount[] | undefined, totalSavings: number, totalDebt: number) => {
    if (!saves || !savingsAccounts || !debtAccounts) {
        return { savingsData: null, tokenCount: 0 };
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

    const savingsData = {
        monthlyTrends: Object.entries(monthlySavings).map(([month, data]) => ({
            month,
            ...data,
            netSavings: data.deposits - data.withdrawals,
        })),
        accounts: {
            savings: savingsAccounts.map((account) => ({
                name: account.name,
                balance: account.balance,
            })),
            debt: debtAccounts.map((account) => ({
                name: account.name,
                balance: account.current_balance,
            })),
        },
        summary: {
            totalSavings,
            totalDebt,
            netWorth: totalSavings - totalDebt,
            savingsToDebtRatio: totalDebt > 0 ? totalSavings / totalDebt : null,
        },
        recentTransactions: saves.slice(0, 5).map((save) => ({
            date: save.date,
            amount: save.amount,
            type: save.type,
        })),
    };

    // Estimate token count
    const tokenCount = JSON.stringify(savingsData).length / 4;

    return { savingsData, tokenCount };
};
