import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSpendService } from '../../services/transaction/create-spend-service';
import { deleteSpendService } from '../../services/transaction/delete-spend-service';
import { updateSpendService } from '../../services/transaction/update-spend-service';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, CircleX } from 'lucide-react';

export const useSpendMutations = () => {
    const queryClient = useQueryClient();

    const createSpendMutation = useMutation({
        mutationFn: (newSpend: Omit<Spend, 'id'>) => createSpendService(newSpend),
        onSuccess: (newSpend: Spend) => {
            queryClient.setQueryData(['spends'], (oldSpends: Spend[] = []) => [...oldSpends, newSpend]);
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Transaction saved!</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to save transaction.</span>
                    </div>
                ),
            });
        },
    });

    const updateSpendMutation = useMutation({
        mutationFn: async (updatedSpend: Spend) => {
            return updateSpendService(updatedSpend);
        },
        onSuccess: (updatedSpend: Spend) => {
            queryClient.setQueryData(['spends'], (oldSpends: Spend[] = []) => oldSpends.map((spend) => (spend.id === updatedSpend.id ? updatedSpend : spend)));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Transaction updated!</span>
                    </div>
                ),
            });
        },
        onError: (error: any) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to update transaction.</span>
                    </div>
                ),
            });
        },
    });

    const deleteSpendMutation = useMutation({
        mutationFn: (saveId: string) => deleteSpendService(saveId),
        onSuccess: (_, deletedSpendId: string) => {
            queryClient.setQueryData(['spends'], (oldSpends: Spend[] = []) => oldSpends.filter((spend) => spend.id !== deletedSpendId));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Transaction deleted.</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to delete transaction.</span>
                    </div>
                ),
            });
        },
    });

    return {
        createSpendMutation,
        updateSpendMutation,
        deleteSpendMutation,
    };
};
