import { createMutationHooks } from '@/utils/factories/mutation-hook-factory';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createAssetService, updateAssetService, deleteAssetService, readAssetsService } from '../../services/supabase/asset-services';

export const useReadAssets = () => {
    return useSuspenseQuery({
        queryKey: ['assets'],
        queryFn: readAssetsService,
    });
};

// Create the hook using the factory
export const useMutateAssets = createMutationHooks<Asset, AssetCreate, AssetUpdate>({
    entityName: 'Asset',
    queryKey: ['assets'],
    services: {
        create: createAssetService,
        update: updateAssetService,
        delete: deleteAssetService,
    },
    // Optional custom messages
    messages: {
        createSuccess: 'Your asset was created successfully!',
        // Other custom messages as needed
    },
});
