import { useSuspenseQuery } from '@tanstack/react-query';
import { analyzeSpending } from '../../services/analysis/analyze-spending.service';

export const useSpendingAnalysis = (spendingData: any) => {
    return useSuspenseQuery({
        queryKey: ['spendingAnalysis', spendingData],
        queryFn: () => analyzeSpending(spendingData),
    });
};
