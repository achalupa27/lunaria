import { useSuspenseQuery } from '@tanstack/react-query';
import { readDebtAccountsService } from '../../services/debt-accounts/read-debt-account-service';

const useFetchDebtAccounts = () => {
    return useSuspenseQuery({
        queryKey: ['debtAccounts'],
        queryFn: () => readDebtAccountsService(),
        retry: 3, // Will retry 3 times before showing error, defaults to 1000ms and doubles with each retry attempt (1s, 2s, 4s)
        staleTime: 1000 * 60, // Will mark as stale (needs refresh) after 1 minute
        refetchOnWindowFocus: true, // Will refetch automatically when Tab becomes active
        refetchOnMount: true, // Will refetch automatically when Component mounts
        refetchOnReconnect: true, // Will refetch automatically when Internet reconnects
    });
};

export default useFetchDebtAccounts;
