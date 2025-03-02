import { createMutationHooks } from '@/utils/factories/mutation-hook-factory';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createDebtAccountService, updateDebtAccountService, deleteDebtAccountService, readDebtAccountsService } from '../../services/supabase/debt-account-services';

export const useReadDebtAccounts = () => {
    return useSuspenseQuery({
        queryKey: ['debt_accounts'],
        queryFn: readDebtAccountsService,
    });
};

// Create the hook using the factory
export const useMutateDebtAccounts = createMutationHooks<DebtAccount, DebtAccountCreate, DebtAccountUpdate>({
    entityName: 'DebtAccount',
    queryKey: ['debt_accounts'],
    services: {
        create: createDebtAccountService,
        update: updateDebtAccountService,
        delete: deleteDebtAccountService,
    },
    // Optional custom messages
    messages: {
        createSuccess: 'Your debt account was created successfully!',
        // Other custom messages as needed
    },
});
