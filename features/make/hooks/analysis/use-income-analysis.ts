import { useSuspenseQuery } from '@tanstack/react-query';
import { analyzeIncome } from '../../services/analysis/analyze-income.service';

export const useIncomeAnalysis = (incomeData: any) => {
    return useSuspenseQuery({
        queryKey: ['incomeAnalysis', incomeData],
        queryFn: () => analyzeIncome(incomeData),
    });
};
