import { format } from 'date-fns';

export const usePrepareIncomeData = (makes: Make[] | undefined) => {
    if (!makes) {
        return { incomeData: null, tokenCount: 0 };
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

    const incomeData = {
        monthlyTrends: Object.entries(monthlyIncome).map(([month, amount]) => ({
            month,
            amount,
        })),
        sourceBreakdown: Object.entries(incomeBySource).map(([source, amount]) => ({
            source,
            amount,
            percentage: ((amount / totalIncome) * 100).toFixed(1),
        })),
        totalIncome,
        numberOfTransactions: makes.length,
        averageTransaction: totalIncome / makes.length,
        recentTransactions: makes.slice(0, 5).map((make) => ({
            date: make.date,
            amount: make.amount,
            source: make.source,
            description: make.description,
        })),
    };

    // Estimate token count
    const tokenCount = JSON.stringify(incomeData).length / 4;

    return { incomeData, tokenCount };
};
