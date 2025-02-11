import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, CircleX } from 'lucide-react';
import { createSavingsAccountService } from '../services/savings-accounts/create-savings-account-service';
import { updateSavingsAccountService } from '../services/savings-accounts/update-savings-account-service';
import { deleteSavingsAccountService } from '../services/savings-accounts/delete-savings-account-service';

export const useSavingsAccountMutations = () => {
    const queryClient = useQueryClient();

    const createSavingsAccountMutation = useMutation({
        mutationFn: (newSavingsAccount: Omit<SavingsAccount, 'id'>) => createSavingsAccountService(newSavingsAccount),
        onSuccess: (newSavingsAccount: SavingsAccount) => {
            queryClient.setQueryData(['savingsAccounts'], (oldSavingsAccounts: SavingsAccount[] = []) => [...oldSavingsAccounts, newSavingsAccount]);
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Savings account created!</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to create savings account.</span>
                    </div>
                ),
            });
        },
    });

    const updateSavingsAccountMutation = useMutation({
        mutationFn: async (updatedSavingsAccount: SavingsAccount) => {
            return updateSavingsAccountService(updatedSavingsAccount);
        },
        onSuccess: (updatedSavingsAccount: SavingsAccount) => {
            queryClient.setQueryData(['savingsAccounts'], (oldSavingsAccounts: SavingsAccount[] = []) => oldSavingsAccounts.map((savingsAccount) => (savingsAccount.id === updatedSavingsAccount.id ? updatedSavingsAccount : savingsAccount)));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Savings account updated!</span>
                    </div>
                ),
            });
        },
        onError: (error: any) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to update savings account.</span>
                    </div>
                ),
            });
        },
    });

    const deleteSavingsAccountMutation = useMutation({
        mutationFn: (savingsAccountId: string) => deleteSavingsAccountService(savingsAccountId),
        onSuccess: (_, deletedSavingsAccountId: string) => {
            queryClient.setQueryData(['savingsAccounts'], (oldSavingsAccounts: SavingsAccount[] = []) => oldSavingsAccounts.filter((savingsAccount) => savingsAccount.id !== deletedSavingsAccountId));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Savings account deleted.</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to delete savings account.</span>
                    </div>
                ),
            });
        },
    });

    return {
        createSavingsAccountMutation,
        updateSavingsAccountMutation,
        deleteSavingsAccountMutation,
    };
};
