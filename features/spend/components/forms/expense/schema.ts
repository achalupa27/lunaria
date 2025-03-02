import { z } from 'zod';
import { createSchemaFromType } from '@/utils/zod';

export const RecurringExpenseSchema = createSchemaFromType<RecurringExpenseCreate>({
    name: z.string({ required_error: 'Name is required.' }),
    amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
    period: z.enum(['weekly', 'monthly', 'yearly'], {
        required_error: 'Period is required.',
    }),
    category: z.string({ required_error: 'Category is required.' }),
    next_billing_date: z.date({ required_error: 'Next billing date is required.' }),
});

export const OneTimeExpenseSchema = createSchemaFromType<SpendCreate>({
    item: z.string({ required_error: 'Item is required.' }),
    cost: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
    store: z.string({ required_error: 'Store is required.' }),
    category: z.string({ required_error: 'Category is required.' }),
    necessity: z.enum(['Need', 'Want', 'Waste'], {
        required_error: 'Necessity is required.',
    }),
    date: z.date({ required_error: 'Date is required.' }),
});
