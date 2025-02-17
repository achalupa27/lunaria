import { useSuspenseQuery } from '@tanstack/react-query';
import { readBudgetsService } from '../../services/budget/read-budgets-service';

const useFetchBudgets = () => {
    return useSuspenseQuery({
        queryKey: ['budgets'],
        queryFn: () => readBudgetsService(),
        retry: 3,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

export default useFetchBudgets;
