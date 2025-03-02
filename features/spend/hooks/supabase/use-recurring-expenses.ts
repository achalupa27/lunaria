import { createMutationHooks } from '@/utils/factories/mutation-hook-factory';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createRecurringExpenseService, updateRecurringExpenseService, deleteRecurringExpenseService, readRecurringExpensesService } from '../../services/supabase/recurring-expense-services';

export const useReadRecurringExpenses = () => {
    return useSuspenseQuery({
        queryKey: ['recurring_expenses'],
        queryFn: readRecurringExpensesService,
    });
};

// Create the hook using the factory
export const useMutateRecurringExpenses = createMutationHooks<RecurringExpense, RecurringExpenseCreate, RecurringExpenseUpdate>({
    entityName: 'RecurringExpense',
    queryKey: ['recurring_expenses'],
    services: {
        create: createRecurringExpenseService,
        update: updateRecurringExpenseService,
        delete: deleteRecurringExpenseService,
    },
    // Optional custom messages
    messages: {
        createSuccess: 'Your recurring expense was created successfully!',
        // Other custom messages as needed
    },
});
