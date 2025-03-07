import { createCrudServices } from '@/utils/factories/crud-service-factory';

// Create all CRUD services for Affirmations using the specific types
const makeServices = createCrudServices<Make, MakeCreate, MakeUpdate>('makes');

// Export individual services with their expected names
export const createMakeService = makeServices.create;
export const readMakesService = () =>
    makeServices.read({
        order: { column: 'created_at', ascending: false },
    });
export const updateMakeService = makeServices.update;
export const deleteMakeService = makeServices.remove;
