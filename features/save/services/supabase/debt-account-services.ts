import { createCrudServices } from '@/utils/factories/crud-service-factory';

// Create all CRUD services for Affirmations using the specific types
const debtAccountServices = createCrudServices<DebtAccount, DebtAccountCreate, DebtAccountUpdate>('debt_accounts');

// Export individual services with their expected names
export const createDebtAccountService = debtAccountServices.create;
export const readDebtAccountsService = () =>
    debtAccountServices.read({
        order: { column: 'created_at', ascending: false },
    });
export const updateDebtAccountService = debtAccountServices.update;
export const deleteDebtAccountService = debtAccountServices.remove;
