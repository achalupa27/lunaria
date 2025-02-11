import { createClient } from '@/utils/supabase/client';

export const readDebtAccountsService = async () => {
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Failed to retrieve user information.');
    }

    const { data: debtAccounts, error } = await supabase.from('debt_accounts').select(`*`).eq('user_id', user.user.id);
    if (error) {
        console.error('Error in readDebtAccountsService: ', error);
    } else {
        return debtAccounts as DebtAccount[];
    }
};
