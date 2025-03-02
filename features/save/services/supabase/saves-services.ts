import { createCrudServices } from '@/utils/factories/crud-service-factory';

// Create all CRUD services for Affirmations using the specific types
const saveServices = createCrudServices<Save, SaveCreate, SaveUpdate>('saves');

// Export individual services with their expected names
export const createSaveService = saveServices.create;
export const readSavesService = () =>
    saveServices.read({
        order: { column: 'created_at', ascending: false },
    });
export const updateSaveService = saveServices.update;
export const deleteSaveService = saveServices.remove;
