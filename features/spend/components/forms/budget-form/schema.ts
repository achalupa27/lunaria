import { z } from 'zod';
import { createSchemaFromType } from '@/utils/zod';

export const FormSchema = createSchemaFromType<BudgetCreate>({
    category: z.string({
        required_error: 'A category is required.',
    }),
    amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
    period: z.enum(['monthly', 'yearly'], {
        required_error: 'A period is required.',
    }),
});
