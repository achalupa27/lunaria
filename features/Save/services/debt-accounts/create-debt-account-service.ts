import { createClient } from '@/utils/supabase/client';

export const createDebtAccountService = async (debtAccount: Omit<DebtAccount, 'id'>) => {
    const supabase = createClient();

    const { data: insertedDebtAccount, error } = await supabase
        .from('debt_accounts')
        .insert({ ...debtAccount })
        .select();

    if (error) console.error('[API ERROR] inserting debtAccount: ', error);
    else return insertedDebtAccount[0];
};
