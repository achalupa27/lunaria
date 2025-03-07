import { createCrudServices } from '@/utils/factories/crud-service-factory';

// Create all CRUD services for Affirmations using the specific types
const recurringExpenseServices = createCrudServices<RecurringExpense, RecurringExpenseCreate, RecurringExpenseUpdate>('recurring_expenses');

// Export individual services with their expected names
export const createRecurringExpenseService = recurringExpenseServices.create;
export const readRecurringExpensesService = () =>
    recurringExpenseServices.read({
        order: { column: 'created_at', ascending: false },
    });
export const updateRecurringExpenseService = recurringExpenseServices.update;
export const deleteRecurringExpenseService = recurringExpenseServices.remove;
