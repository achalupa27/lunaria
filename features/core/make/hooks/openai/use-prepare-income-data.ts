import { format } from 'date-fns';
import { useMemo } from 'react';

type PreparedIncomeData = {
    incomeData: string;
    tokenCount: number;
};

export const usePrepareIncomeData = (makes: Make[] | undefined): PreparedIncomeData => {
    return useMemo(() => {
        if (!makes || makes.length === 0) {
            return { incomeData: '', tokenCount: 0 };
        }

        // Calculate monthly income trends
        const monthlyIncome = makes.reduce(
            (acc, make) => {
                const monthKey = format(new Date(make.date), 'MMM yyyy');
                if (!acc[monthKey]) {
                    acc[monthKey] = 0;
                }
                acc[monthKey] += make.amount;
                return acc;
            },
            {} as Record<string, number>
        );

        // Calculate income by source
        const incomeBySource = makes.reduce(
            (acc, make) => {
                if (!acc[make.source]) {
                    acc[make.source] = 0;
                }
                acc[make.source] += make.amount;
                return acc;
            },
            {} as Record<string, number>
        );

        // Calculate total income
        const totalIncome = makes.reduce((sum, make) => sum + make.amount, 0);
        const averageTransaction = makes.length > 0 ? totalIncome / makes.length : 0;

        // Helper function to safely convert value to string
        const safeString = (value: any): string => value ?? '';

        // Convert data to CSV-like format
        const incomesData = ['INCOME TRANSACTIONS', 'date,amount,source', ...makes.map((make) => [safeString(make.date), safeString(make.amount), safeString(make.source)].join(','))];

        const monthlyTrendsData = ['MONTHLY TRENDS', 'month,amount', ...Object.entries(monthlyIncome).map(([month, amount]) => `${month},${amount}`)];

        const sourceBreakdownData = ['SOURCE BREAKDOWN', 'source,amount,percentage', ...Object.entries(incomeBySource).map(([source, amount]) => `${source},${amount},${((amount / totalIncome) * 100).toFixed(1)}`)];

        const summaryData = ['INCOME SUMMARY', `Total Income,${totalIncome}`, `Number of Transactions,${makes.length}`, `Average Transaction,${averageTransaction.toFixed(2)}`];

        // Combine all data sections
        const combinedData = [...incomesData, '', ...monthlyTrendsData, '', ...sourceBreakdownData, '', ...summaryData].join('\n');

        return {
            incomeData: combinedData,
            tokenCount: Math.ceil(combinedData.length / 4),
        };
    }, [makes]);
};
