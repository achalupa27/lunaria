import { createMutationHooks } from '@/utils/factories/mutation-hook-factory';
import { useSuspenseQuery } from '@tanstack/react-query';
import { deleteMakeService, readMakesService, updateMakeService } from '../../services/supabase/make-services';
import { createMakeService } from '../../services/supabase/make-services';

export const useReadMakes = () => {
    return useSuspenseQuery({
        queryKey: ['makes'],
        queryFn: readMakesService,
    });
};

// Create the hook using the factory
export const useMutateMakes = createMutationHooks<Make, MakeCreate, MakeUpdate>({
    entityName: 'Make',
    queryKey: ['makes'],
    services: {
        create: createMakeService,
        update: updateMakeService,
        delete: deleteMakeService,
    },
    // Optional custom messages
    messages: {
        createSuccess: 'Your make was created successfully!',
        // Other custom messages as needed
    },
});
