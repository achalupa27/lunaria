import { startOfMonth, startOfYear, subMonths, subYears } from 'date-fns';

export type SavingTerm = 'This Month' | 'Last Month' | 'This Year' | 'Last Year' | 'All Time';

export const useFilteredSaves = (saves: Save[] | undefined, selectedTerm: SavingTerm) => {
    if (!saves) return { filteredSaves: [], totalSaved: 0, totalWithdrawn: 0 };

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
            return {
                filteredSaves: saves,
                totalSaved: saves.reduce((sum, save) => (save.type === 'Deposit' ? sum + save.amount : sum), 0),
                totalWithdrawn: saves.reduce((sum, save) => (save.type === 'Withdrawal' ? sum + save.amount : sum), 0),
            };
    }

    const filteredSaves = saves.filter((save) => {
        const saveDate = new Date(save.date);
        return saveDate >= startDate;
    });

    return {
        filteredSaves,
        totalSaved: filteredSaves.reduce((sum, save) => (save.type === 'Deposit' ? sum + save.amount : sum), 0),
        totalWithdrawn: filteredSaves.reduce((sum, save) => (save.type === 'Withdrawal' ? sum + save.amount : sum), 0),
    };
};
