import { useSuspenseQuery } from '@tanstack/react-query';
import { analyzeSpending } from '../../services/openai/analysis-service';

export const useSpendingAnalysis = (spendingData: any) => {
    return useSuspenseQuery({
        queryKey: ['spendingAnalysis', spendingData],
        queryFn: () => analyzeSpending(spendingData),
    });
};
