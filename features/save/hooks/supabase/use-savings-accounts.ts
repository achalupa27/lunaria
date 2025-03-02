import { createMutationHooks } from '@/utils/factories/mutation-hook-factory';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createSavingsAccountService, updateSavingsAccountService, deleteSavingsAccountService, readSavingsAccountsService } from '../../services/supabase/savings-accounts-services';

export const useReadSavingsAccounts = () => {
    return useSuspenseQuery({
        queryKey: ['savings_accounts'],
        queryFn: readSavingsAccountsService,
    });
};

// Create the hook using the factory
export const useMutateSavingsAccounts = createMutationHooks<SavingsAccount, SavingsAccountCreate, SavingsAccountUpdate>({
    entityName: 'SavingsAccount',
    queryKey: ['savings_accounts'],
    services: {
        create: createSavingsAccountService,
        update: updateSavingsAccountService,
        delete: deleteSavingsAccountService,
    },
    // Optional custom messages
    messages: {
        createSuccess: 'Your savings account was created successfully!',
        // Other custom messages as needed
    },
});
