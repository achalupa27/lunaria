import { useSuspenseQuery } from '@tanstack/react-query';
import { readRecurringExpensesService } from '../../services/recurring-expense/read-recurring-expenses-service';

const useFetchRecurringExpenses = () => {
    return useSuspenseQuery({
        queryKey: ['recurring_expenses'],
        queryFn: () => readRecurringExpensesService(),
        retry: 3,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

export default useFetchRecurringExpenses;
