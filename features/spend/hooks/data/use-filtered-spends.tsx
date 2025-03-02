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
        let termFilteredTransactions: Spend[];

        switch (selectedTerm) {
            case 'This Month': {
                const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
                const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

                termFilteredTransactions = spends.filter((spend) => {
                    const spendDate = new Date(spend.date);
                    return spendDate >= firstDay && spendDate <= lastDay;
                });
                break;
            }
            case 'Last Month': {
                const firstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                const lastDay = new Date(now.getFullYear(), now.getMonth(), 0);

                termFilteredTransactions = spends.filter((spend) => {
                    const spendDate = new Date(spend.date);
                    return spendDate >= firstDay && spendDate <= lastDay;
                });
                break;
            }
            case 'This Year': {
                const firstDay = new Date(now.getFullYear(), 0, 1);
                const lastDay = new Date(now.getFullYear(), 11, 31);

                termFilteredTransactions = spends.filter((spend) => {
                    const spendDate = new Date(spend.date);
                    return spendDate >= firstDay && spendDate <= lastDay;
                });
                break;
            }
            case 'Last Year': {
                const firstDay = new Date(now.getFullYear() - 1, 0, 1);
                const lastDay = new Date(now.getFullYear() - 1, 11, 31);

                termFilteredTransactions = spends.filter((spend) => {
                    const spendDate = new Date(spend.date);
                    return spendDate >= firstDay && spendDate <= lastDay;
                });
                break;
            }
            case 'All Time':
            default:
                termFilteredTransactions = spends;
        }

        setFilteredSpends(termFilteredTransactions);

        // Calculate totals
        if (termFilteredTransactions.length > 0) {
            const necessityTotals = termFilteredTransactions.reduce(
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
            const catTotals = termFilteredTransactions.reduce(
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
