import { createCrudServices } from '@/utils/factories/crud-service-factory';

// Create all CRUD services for Affirmations using the specific types
const spendServices = createCrudServices<Spend, SpendCreate, SpendUpdate>('spends');

// Export individual services with their expected names
export const createSpendService = spendServices.create;
export const readSpendsService = () =>
    spendServices.read({
        order: { column: 'created_at', ascending: false },
    });
export const updateSpendService = spendServices.update;
export const deleteSpendService = spendServices.remove;
