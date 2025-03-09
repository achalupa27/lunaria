import { startOfMonth, startOfYear, subMonths, subYears } from 'date-fns';
import { Period } from '@/components/ui/period-selector';

export const useFilteredMakes = (makes: Make[] | undefined, selectedTerm: Period) => {
    if (!makes) return { filteredMakes: [], totalIncome: 0, incomeBySource: {}, accountsReceivable: [] };

    const now = new Date();
    let startDate: Date;

    switch (selectedTerm) {
        case 'This Month':
            startDate = startOfMonth(now);
            break;
        case 'Last Month':
            startDate = startOfMonth(subMonths(now, 1));
            break;
        case 'This Year':
            startDate = startOfYear(now);
            break;
        case 'Last Year':
            startDate = startOfYear(subYears(now, 1));
            break;
        default:
            startDate = new Date(0); // Beginning of time for 'All Time'
    }

    // Separate makes into past (received) and future (receivable)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter makes by date range and only include those with dates up to today
    const filteredMakes = makes.filter((make) => {
        const makeDate = new Date(make.date);
        return makeDate >= startDate && makeDate <= today;
    });

    // Get accounts receivable (future dates)
    const accountsReceivable = makes.filter((make) => {
        const makeDate = new Date(make.date);
        return makeDate > today;
    });

    const incomeBySource = filteredMakes.reduce(
        (acc, make) => {
            if (!acc[make.source]) acc[make.source] = 0;
            acc[make.source] += make.amount;
            return acc;
        },
        {} as Record<string, number>
    );
    const totalReceivable = accountsReceivable.reduce((sum, make) => sum + make.amount, 0);

    return {
        filteredMakes,
        totalIncome: filteredMakes.reduce((sum, make) => sum + make.amount, 0),
        incomeBySource,
        accountsReceivable,
        totalReceivable,
    };
};
