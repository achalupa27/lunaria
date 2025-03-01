import { startOfMonth, startOfYear, subMonths, subYears } from 'date-fns';
import { Period } from '@/components/ui/period-selector';

export const useFilteredMakes = (makes: Make[] | undefined, selectedTerm: Period) => {
    if (!makes) return { filteredMakes: [], totalIncome: 0, incomeBySource: {} };

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

    const filteredMakes = makes.filter((make) => new Date(make.date) >= startDate);

    const incomeBySource = filteredMakes.reduce(
        (acc, make) => {
            if (!acc[make.source]) acc[make.source] = 0;
            acc[make.source] += make.amount;
            return acc;
        },
        {} as Record<string, number>
    );

    return {
        filteredMakes,
        totalIncome: filteredMakes.reduce((sum, make) => sum + make.amount, 0),
        incomeBySource,
    };
};
