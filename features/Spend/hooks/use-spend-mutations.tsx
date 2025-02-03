import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSpendService } from '../services/create-spend-service';
import { deleteSpendService } from '../services/delete-spend-service';
import { updateSpendService } from '../services/update-spend-service';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, CircleX } from 'lucide-react';

export const useSpendMutations = () => {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient();

    const createSpendMutation = useMutation({
        mutationFn: (newSpend: Omit<Spend, 'id'>) => createSpendService(newSpend, supabaseClient),
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
            return updateSpendService(updatedSpend, supabaseClient);
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
            console.error('Failed to update spend:', error);
        },
    });

    const deleteSpendMutation = useMutation({
        mutationFn: (saveId: string) => deleteSpendService(saveId, supabaseClient),
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
            console.error('Failed to delete spend:', error);
        },
    });

    return {
        createSpendMutation,
        updateSpendMutation,
        deleteSpendMutation,
    };
};
