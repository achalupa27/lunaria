import { createMutationHooks } from '@/utils/factories/mutation-hook-factory';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createSaveService, updateSaveService, deleteSaveService, readSavesService } from '../../services/supabase/saves-services';

export const useReadSaves = () => {
    return useSuspenseQuery({
        queryKey: ['saves'],
        queryFn: readSavesService,
    });
};

// Create the hook using the factory
export const useMutateSaves = createMutationHooks<Save, SaveCreate, SaveUpdate>({
    entityName: 'Save',
    queryKey: ['saves'],
    services: {
        create: createSaveService,
        update: updateSaveService,
        delete: deleteSaveService,
    },
    // Optional custom messages
    messages: {
        createSuccess: 'Your save was created successfully!',
        // Other custom messages as needed
    },
});
