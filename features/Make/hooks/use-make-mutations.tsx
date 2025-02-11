import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMakeService } from '../services/create-make-service';
import { deleteMakeService } from '../services/delete-make-service';
import { updateMakeService } from '../services/update-make-service';

export const useMakeMutations = () => {
    const queryClient = useQueryClient();

    const createMakeMutation = useMutation({
        mutationFn: (newMake: Omit<Make, 'id' | 'user_id'>) => createMakeService(newMake),
        onSuccess: (newMake: Make) => {
            queryClient.setQueryData(['makes'], (oldMakes: Make[] = []) => [...oldMakes, newMake]);
        },
        onError: (error) => {
            console.error('Failed to create make:', error);
        },
    });

    const updateMakeMutation = useMutation({
        mutationFn: async (updatedMake: Omit<Make, 'user_id'>) => {
            return updateMakeService(updatedMake);
        },
        onSuccess: (updatedMake: Make) => {
            queryClient.setQueryData(['makes'], (oldMakes: Make[] = []) => oldMakes.map((make) => (make.id === updatedMake.id ? updatedMake : make)));
        },
        onError: (error: any) => {
            console.error('Failed to update make:', error);
        },
    });

    const deleteMakeMutation = useMutation({
        mutationFn: (saveId: string) => deleteMakeService(saveId),
        onSuccess: (_, deletedMakeId: string) => {
            queryClient.setQueryData(['makes'], (oldMakes: Make[] = []) => oldMakes.filter((make) => make.id !== deletedMakeId));
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
