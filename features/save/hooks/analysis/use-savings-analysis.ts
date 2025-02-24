import { useSuspenseQuery } from '@tanstack/react-query';
import { analyzeSavings } from '../../services/analysis/analyze-savings.service';

export const useSavingsAnalysis = (savingsData: any) => {
    return useSuspenseQuery({
        queryKey: ['savingsAnalysis', savingsData],
        queryFn: () => analyzeSavings(savingsData),
    });
};
