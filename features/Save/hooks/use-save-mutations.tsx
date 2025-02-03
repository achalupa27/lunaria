import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSaveService } from '../services/create-save-service';
import { deleteSaveService } from '../services/delete-save-service';
import { updateSaveService } from '../services/update-save-service';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useSaveMutations = () => {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient();

    const createSaveMutation = useMutation({
        mutationFn: (newSave: Omit<Save, 'id'>) => createSaveService(newSave, supabaseClient),
        onSuccess: (newSave: Save) => {
            queryClient.setQueryData(['saves'], (oldSaves: Save[] = []) => [...oldSaves, newSave]);
        },
        onError: (error) => {
            console.error('Failed to create save:', error);
        },
    });

    const updateSaveMutation = useMutation({
        mutationFn: async (updatedSave: Save) => {
            return updateSaveService(updatedSave, supabaseClient);
        },
        onSuccess: (updatedSave: Save) => {
            queryClient.setQueryData(['saves'], (oldSaves: Save[] = []) => oldSaves.map((save) => (save.id === updatedSave.id ? updatedSave : save)));
        },
        onError: (error: any) => {
            console.error('Failed to update save:', error);
        },
    });

    const deleteSaveMutation = useMutation({
        mutationFn: (saveId: number) => deleteSaveService(saveId, supabaseClient),
        onSuccess: (_, deletedSaveId: number) => {
            queryClient.setQueryData(['saves'], (oldSaves: Save[] = []) => oldSaves.filter((save) => save.id !== deletedSaveId));
        },
        onError: (error) => {
            console.error('Failed to delete save:', error);
        },
    });

    return {
        createSaveMutation,
        updateSaveMutation,
        deleteSaveMutation,
    };
};
