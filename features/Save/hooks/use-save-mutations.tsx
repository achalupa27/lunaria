import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSaveService } from '../services/saves/create-save-service';
import { deleteSaveService } from '../services/saves/delete-save-service';
import { updateSaveService } from '../services/saves/update-save-service';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, CircleX } from 'lucide-react';

export const useSaveMutations = () => {
    const queryClient = useQueryClient();
    const supabaseClient = useSupabaseClient();

    const createSaveMutation = useMutation({
        mutationFn: (newSave: Omit<Save, 'id'>) => createSaveService(newSave, supabaseClient),
        onSuccess: (newSave: Save) => {
            queryClient.setQueryData(['saves'], (oldSaves: Save[] = []) => [...oldSaves, newSave]);
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

    const updateSaveMutation = useMutation({
        mutationFn: async (updatedSave: Save) => {
            return updateSaveService(updatedSave, supabaseClient);
        },
        onSuccess: (updatedSave: Save) => {
            queryClient.setQueryData(['saves'], (oldSaves: Save[] = []) => oldSaves.map((save) => (save.id === updatedSave.id ? updatedSave : save)));
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

    const deleteSaveMutation = useMutation({
        mutationFn: (saveId: string) => deleteSaveService(saveId, supabaseClient),
        onSuccess: (_, deletedSaveId: string) => {
            queryClient.setQueryData(['saves'], (oldSaves: Save[] = []) => oldSaves.filter((save) => save.id !== deletedSaveId));
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
        createSaveMutation,
        updateSaveMutation,
        deleteSaveMutation,
    };
};
