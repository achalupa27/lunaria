import { createCrudServices } from '@/utils/factories/crud-service-factory';

// Create all CRUD services for Affirmations using the specific types
const savingsAccountServices = createCrudServices<SavingsAccount, SavingsAccountCreate, SavingsAccountUpdate>('savings_accounts');

// Export individual services with their expected names
export const createSavingsAccountService = savingsAccountServices.create;
export const readSavingsAccountsService = () =>
    savingsAccountServices.read({
        order: { column: 'created_at', ascending: false },
    });
export const updateSavingsAccountService = savingsAccountServices.update;
export const deleteSavingsAccountService = savingsAccountServices.remove;
