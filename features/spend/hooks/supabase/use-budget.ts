import { createMutationHooks } from '@/utils/factories/mutation-hook-factory';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createBudgetService, updateBudgetService, deleteBudgetService, readBudgetsService } from '../../services/supabase/budget-services';

export const useReadBudgets = () => {
    return useSuspenseQuery({
        queryKey: ['budgets'],
        queryFn: readBudgetsService,
    });
};

// Create the hook using the factory
export const useMutateBudgets = createMutationHooks<Budget, BudgetCreate, BudgetUpdate>({
    entityName: 'Budget',
    queryKey: ['budgets'],
    services: {
        create: createBudgetService,
        update: updateBudgetService,
        delete: deleteBudgetService,
    },
    // Optional custom messages
    messages: {
        createSuccess: 'Your budget was created successfully!',
        // Other custom messages as needed
    },
});
