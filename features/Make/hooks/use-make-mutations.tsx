import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMakeService } from '../services/create-make-service';
import { deleteMakeService } from '../services/delete-make-service';
import { updateMakeService } from '../services/update-make-service';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useMakeMutations = () => {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient();

    const createMakeMutation = useMutation({
        mutationFn: (newMake: Omit<Make, 'id'>) => createMakeService(newMake, supabaseClient),
        onSuccess: (newMake: Make) => {
            queryClient.setQueryData(['saves'], (oldMakes: Make[] = []) => [...oldMakes, newMake]);
        },
        onError: (error) => {
            console.error('Failed to create make:', error);
        },
    });

    const updateMakeMutation = useMutation({
        mutationFn: async (updatedMake: Make) => {
            return updateMakeService(updatedMake, supabaseClient);
        },
        onSuccess: (updatedMake: Make) => {
            queryClient.setQueryData(['saves'], (oldMakes: Make[] = []) => oldMakes.map((make) => (make.id === updatedMake.id ? updatedMake : make)));
        },
        onError: (error: any) => {
            console.error('Failed to update make:', error);
        },
    });

    const deleteMakeMutation = useMutation({
        mutationFn: (saveId: number) => deleteMakeService(saveId, supabaseClient),
        onSuccess: (_, deletedMakeId: number) => {
            queryClient.setQueryData(['saves'], (oldMakes: Make[] = []) => oldMakes.filter((make) => make.id !== deletedMakeId));
        },
        onError: (error) => {
            console.error('Failed to delete make:', error);
        },
    });

    return {
        createMakeMutation,
        updateMakeMutation,
        deleteMakeMutation,
    };
};
