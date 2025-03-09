import { createSchemaFromType } from '@/utils/zod';
import { z } from 'zod';

export const SavingsAccountFormSchema = createSchemaFromType<SavingsAccountCreate>({
    name: z.string({
        required_error: 'An account name is required.',
    }),
    balance: z.coerce.number({
        required_error: 'A balance is required.',
    }),
    interest_rate: z.coerce.number().optional(),
    interest_period: z.string().optional(),
});

export const DebtAccountFormSchema = createSchemaFromType<DebtAccountCreate>({
    name: z.string({
        required_error: 'An account name is required.',
    }),
    current_balance: z.coerce.number({
        required_error: 'A current balance is required.',
    }),
    initial_balance: z.coerce.number().optional(),
    creditor: z.string({
        required_error: 'A creditor is required.',
    }),
    interest_rate: z.coerce.number({
        required_error: 'An interest rate is required.',
    }),
    interest_period: z.string({
        required_error: 'An interest period is required.',
    }),
});
