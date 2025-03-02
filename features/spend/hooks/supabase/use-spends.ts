import { createMutationHooks } from '@/utils/factories/mutation-hook-factory';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createSpendService, updateSpendService, deleteSpendService, readSpendsService } from '../../services/supabase/spend-services';

export const useReadSpends = () => {
    return useSuspenseQuery({
        queryKey: ['spends'],
        queryFn: readSpendsService,
    });
};

// Create the hook using the factory
export const useMutateSpends = createMutationHooks<Spend, SpendCreate, SpendUpdate>({
    entityName: 'Spend',
    queryKey: ['spends'],
    services: {
        create: createSpendService,
        update: updateSpendService,
        delete: deleteSpendService,
    },
    // Optional custom messages
    messages: {
        createSuccess: 'Your spend was created successfully!',
        // Other custom messages as needed
    },
});
