import { useEffect, useState } from 'react';

export type SpendingTerm = 'This Month' | 'Last Month' | 'This Year' | 'Last Year' | 'All Time';

type SpendTotals = {
    totalNeedSpent: number;
    totalWantSpent: number;
    totalWasteSpent: number;
    totalSpent: number;
};

export const useFilteredSpends = (spends: Spend[] | undefined, selectedTerm: SpendingTerm) => {
    const [filteredSpends, setFilteredSpends] = useState<Spend[]>([]);
    const [totals, setTotals] = useState<SpendTotals>({
        totalNeedSpent: 0,
        totalWantSpent: 0,
        totalWasteSpent: 0,
        totalSpent: 0,
    });
    const [categoryTotals, setCategoryTotals] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        if (!spends) {
            setFilteredSpends([]);
            return;
        }

        const now = new Date();
        let filtered: Spend[];

        switch (selectedTerm) {
            case 'This Month': {
                const thisMonth = now.getMonth();
                const thisYear = now.getFullYear();
                filtered = spends.filter((spend) => {
                    const spendDate = new Date(spend.date);
                    return spendDate.getMonth() === thisMonth && spendDate.getFullYear() === thisYear;
                });
                break;
            }
            case 'Last Month': {
                const lastMonth = now.getMonth() - 1;
                const year = lastMonth === -1 ? now.getFullYear() - 1 : now.getFullYear();
                const month = lastMonth === -1 ? 11 : lastMonth;
                filtered = spends.filter((spend) => {
                    const spendDate = new Date(spend.date);
                    return spendDate.getMonth() === month && spendDate.getFullYear() === year;
                });
                break;
            }
            case 'This Year': {
                const thisYear = now.getFullYear();
                filtered = spends.filter((spend) => {
                    const spendDate = new Date(spend.date);
                    return spendDate.getFullYear() === thisYear;
                });
                break;
            }
            case 'Last Year': {
                const lastYear = now.getFullYear() - 1;
                filtered = spends.filter((spend) => {
                    const spendDate = new Date(spend.date);
                    return spendDate.getFullYear() === lastYear;
                });
                break;
            }
            case 'All Time':
            default:
                filtered = spends;
        }

        setFilteredSpends(filtered);

        // Calculate totals
        if (filtered.length > 0) {
            const necessityTotals = filtered.reduce(
                (acc, spend) => {
                    switch (spend.necessity) {
                        case 'Need':
                            acc.totalNeedSpent += spend.cost;
                            break;
                        case 'Want':
                            acc.totalWantSpent += spend.cost;
                            break;
                        case 'Waste':
                            acc.totalWasteSpent += spend.cost;
                            break;
                    }
                    acc.totalSpent += spend.cost;
                    return acc;
                },
                {
                    totalNeedSpent: 0,
                    totalWantSpent: 0,
                    totalWasteSpent: 0,
                    totalSpent: 0,
                }
            );

            setTotals({
                totalNeedSpent: Number(necessityTotals.totalNeedSpent.toFixed(2)),
                totalWantSpent: Number(necessityTotals.totalWantSpent.toFixed(2)),
                totalWasteSpent: Number(necessityTotals.totalWasteSpent.toFixed(2)),
                totalSpent: Number(necessityTotals.totalSpent.toFixed(2)),
            });

            // Calculate category totals
            const catTotals = filtered.reduce(
                (acc, spend) => {
                    const category = spend.category;
                    acc[category] = (acc[category] || 0) + spend.cost;
                    return acc;
                },
                {} as { [key: string]: number }
            );
            setCategoryTotals(catTotals);
        } else {
            setTotals({
                totalNeedSpent: 0,
                totalWantSpent: 0,
                totalWasteSpent: 0,
                totalSpent: 0,
            });
            setCategoryTotals({});
        }
    }, [spends, selectedTerm]);

    return {
        filteredSpends,
        ...totals,
        categoryTotals,
    };
};
