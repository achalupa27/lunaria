import { createClient } from '@/utils/supabase/client';

export const updateDebtAccountService = async (debtAccount: DebtAccount): Promise<DebtAccount> => {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('debt_accounts')
            .upsert({ ...debtAccount })
            .eq('id', debtAccount.id)
            .select();

        if (error) console.error('[ERROR] updating debtAccount: ', error.message);
        return data?.[0] as DebtAccount;
    } catch (error: any) {
        console.error('Error inserting debtAccount:', error);
        throw error;
    }
};
