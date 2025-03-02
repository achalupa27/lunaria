import { createCrudServices } from '@/utils/factories/crud-service-factory';

// Create all CRUD services for Affirmations using the specific types
const budgetServices = createCrudServices<Budget, BudgetCreate, BudgetUpdate>('budgets');

// Export individual services with their expected names
export const createBudgetService = budgetServices.create;
export const readBudgetsService = () =>
    budgetServices.read({
        order: { column: 'created_at', ascending: false },
    });
export const updateBudgetService = budgetServices.update;
export const deleteBudgetService = budgetServices.remove;
