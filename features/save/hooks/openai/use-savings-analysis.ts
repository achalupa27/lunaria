import { useSuspenseQuery } from '@tanstack/react-query';
import { analyzeSavings } from '../../services/openai/analysis-service';

export const useSavingsAnalysis = (savingsData: any) => {
    return useSuspenseQuery({
        queryKey: ['savingsAnalysis', savingsData],
        queryFn: () => analyzeSavings(savingsData),
    });
};
