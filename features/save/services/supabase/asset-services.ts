import { createCrudServices } from '@/utils/factories/crud-service-factory';

// Create all CRUD services for Affirmations using the specific types
const assetServices = createCrudServices<Asset, AssetCreate, AssetUpdate>('assets');

// Export individual services with their expected names
export const createAssetService = assetServices.create;
export const readAssetsService = () =>
    assetServices.read({
        order: { column: 'created_at', ascending: false },
    });
export const updateAssetService = assetServices.update;
export const deleteAssetService = assetServices.remove;
