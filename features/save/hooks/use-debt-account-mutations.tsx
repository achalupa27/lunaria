import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, CircleX } from 'lucide-react';
import { createDebtAccountService } from '../services/debt-accounts/create-debt-account-service';
import { deleteDebtAccountService } from '../services/debt-accounts/delete-debt-account-service';
import { updateDebtAccountService } from '../services/debt-accounts/update-debt-account-service';

export const useDebtAccountMutations = () => {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient();

    const createDebtAccountMutation = useMutation({
        mutationFn: (newDebtAccount: Omit<DebtAccount, 'id'>) => createDebtAccountService(newDebtAccount, supabaseClient),
        onSuccess: (newDebtAccount: DebtAccount) => {
            queryClient.setQueryData(['debtAccounts'], (oldDebtAccounts: DebtAccount[] = []) => [...oldDebtAccounts, newDebtAccount]);
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Debt account created!</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to create debt account.</span>
                    </div>
                ),
            });
        },
    });

    const updateDebtAccountMutation = useMutation({
        mutationFn: async (updatedDebtAccount: DebtAccount) => {
            return updateDebtAccountService(updatedDebtAccount, supabaseClient);
        },
        onSuccess: (updatedDebtAccount: DebtAccount) => {
            queryClient.setQueryData(['debtAccounts'], (oldDebtAccounts: DebtAccount[] = []) => oldDebtAccounts.map((debtAccount) => (debtAccount.id === updatedDebtAccount.id ? updatedDebtAccount : debtAccount)));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Debt account updated!</span>
                    </div>
                ),
            });
        },
        onError: (error: any) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to update debt account.</span>
                    </div>
                ),
            });
        },
    });

    const deleteDebtAccountMutation = useMutation({
        mutationFn: (debtAccountId: string) => deleteDebtAccountService(debtAccountId, supabaseClient),
        onSuccess: (_, deletedDebtAccountId: string) => {
            queryClient.setQueryData(['debtAccounts'], (oldDebtAccounts: Save[] = []) => oldDebtAccounts.filter((debtAccount) => debtAccount.id !== deletedDebtAccountId));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Debt account deleted.</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to delete debt account.</span>
                    </div>
                ),
            });
        },
    });

    return {
        createDebtAccountMutation,
        updateDebtAccountMutation,
        deleteDebtAccountMutation,
    };
};
