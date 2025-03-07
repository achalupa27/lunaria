import { createSchemaFromType } from '@/utils/zod';
import { z } from 'zod';

export const FormSchema = createSchemaFromType<SaveCreate>({
    type: z.enum(['Deposit', 'Withdrawal'], {
        required_error: 'A type is required.',
    }),
    account: z.string({
        required_error: 'An account is required.',
    }),
    amount: z.coerce.number({
        required_error: 'An amount is required.',
    }),
    date: z.date({
        required_error: 'A date is required.',
    }),
});
