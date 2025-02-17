import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecurringExpenseService } from '../../services/recurring-expense/create-recurring-expense-service';
import { deleteRecurringExpenseService } from '../../services/recurring-expense/delete-recurring-expense-service';
import { updateRecurringExpenseService } from '../../services/recurring-expense/update-recurring-expense-service';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, CircleX } from 'lucide-react';

export const useRecurringExpenseMutations = () => {
    const queryClient = useQueryClient();

    const createRecurringExpenseMutation = useMutation({
        mutationFn: (newExpense: Omit<RecurringExpense, 'id' | 'created_at'>) => createRecurringExpenseService(newExpense),
        onSuccess: (newExpense: RecurringExpense) => {
            queryClient.setQueryData(['recurring_expenses'], (oldExpenses: RecurringExpense[] = []) => [...oldExpenses, newExpense]);
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Recurring expense saved!</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to save recurring expense.</span>
                    </div>
                ),
            });
        },
    });

    const updateRecurringExpenseMutation = useMutation({
        mutationFn: async (updatedExpense: RecurringExpense) => {
            return updateRecurringExpenseService(updatedExpense);
        },
        onSuccess: (updatedExpense: RecurringExpense) => {
            queryClient.setQueryData(['recurring_expenses'], (oldExpenses: RecurringExpense[] = []) => oldExpenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense)));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Recurring expense updated!</span>
                    </div>
                ),
            });
        },
        onError: (error: any) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to update recurring expense.</span>
                    </div>
                ),
            });
        },
    });

    const deleteRecurringExpenseMutation = useMutation({
        mutationFn: (expenseId: string) => deleteRecurringExpenseService(expenseId),
        onSuccess: (_, deletedExpenseId: string) => {
            queryClient.setQueryData(['recurring_expenses'], (oldExpenses: RecurringExpense[] = []) => oldExpenses.filter((expense) => expense.id !== deletedExpenseId));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Recurring expense deleted.</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to delete recurring expense.</span>
                    </div>
                ),
            });
        },
    });

    return {
        createRecurringExpenseMutation,
        updateRecurringExpenseMutation,
        deleteRecurringExpenseMutation,
    };
};
