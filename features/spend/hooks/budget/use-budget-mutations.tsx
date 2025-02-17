import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBudgetService } from '../../services/budget/create-budget-service';
import { deleteBudgetService } from '../../services/budget/delete-budget-service';
import { updateBudgetService } from '../../services/budget/update-budget-service';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, CircleX } from 'lucide-react';

export const useBudgetMutations = () => {
    const queryClient = useQueryClient();

    const createBudgetMutation = useMutation({
        mutationFn: (newBudget: Omit<Budget, 'id' | 'created_at'>) => createBudgetService(newBudget),
        onSuccess: (newBudget: Budget) => {
            queryClient.setQueryData(['budgets'], (oldBudgets: Budget[] = []) => [...oldBudgets, newBudget]);
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Budget saved!</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to save budget.</span>
                    </div>
                ),
            });
        },
    });

    const updateBudgetMutation = useMutation({
        mutationFn: async (updatedBudget: Budget) => {
            return updateBudgetService(updatedBudget);
        },
        onSuccess: (updatedBudget: Budget) => {
            queryClient.setQueryData(['budgets'], (oldBudgets: Budget[] = []) => oldBudgets.map((budget) => (budget.id === updatedBudget.id ? updatedBudget : budget)));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Budget updated!</span>
                    </div>
                ),
            });
        },
        onError: (error: any) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to update budget.</span>
                    </div>
                ),
            });
        },
    });

    const deleteBudgetMutation = useMutation({
        mutationFn: (budgetId: string) => deleteBudgetService(budgetId),
        onSuccess: (_, deletedBudgetId: string) => {
            queryClient.setQueryData(['budgets'], (oldBudgets: Budget[] = []) => oldBudgets.filter((budget) => budget.id !== deletedBudgetId));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Budget deleted.</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to delete budget.</span>
                    </div>
                ),
            });
        },
    });

    return {
        createBudgetMutation,
        updateBudgetMutation,
        deleteBudgetMutation,
    };
};
