import { useSuspenseQuery } from '@tanstack/react-query';
import { analyzeIncome } from '../../services/openai/analysis-service';

export const useIncomeAnalysis = (incomeData: any) => {
    return useSuspenseQuery({
        queryKey: ['incomeAnalysis', incomeData],
        queryFn: () => analyzeIncome(incomeData),
    });
};
