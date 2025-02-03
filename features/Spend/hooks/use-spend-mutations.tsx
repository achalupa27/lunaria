import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSpendService } from '../services/create-spend-service';
import { deleteSpendService } from '../services/delete-spend-service';
import { updateSpendService } from '../services/update-spend-service';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useSpendMutations = () => {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient();

    const createSpendMutation = useMutation({
        mutationFn: (newSpend: Omit<Spend, 'id'>) => createSpendService(newSpend, supabaseClient),
        onSuccess: (newSpend: Spend) => {
            queryClient.setQueryData(['saves'], (oldSpends: Spend[] = []) => [...oldSpends, newSpend]);
        },
        onError: (error) => {
            console.error('Failed to create spend:', error);
        },
    });

    const updateSpendMutation = useMutation({
        mutationFn: async (updatedSpend: Spend) => {
            return updateSpendService(updatedSpend, supabaseClient);
        },
        onSuccess: (updatedSpend: Spend) => {
            queryClient.setQueryData(['saves'], (oldSpends: Spend[] = []) => oldSpends.map((spend) => (spend.id === updatedSpend.id ? updatedSpend : spend)));
        },
        onError: (error: any) => {
            console.error('Failed to update spend:', error);
        },
    });

    const deleteSpendMutation = useMutation({
        mutationFn: (saveId: number) => deleteSpendService(saveId, supabaseClient),
        onSuccess: (_, deletedSpendId: number) => {
            queryClient.setQueryData(['saves'], (oldSpends: Spend[] = []) => oldSpends.filter((spend) => spend.id !== deletedSpendId));
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
