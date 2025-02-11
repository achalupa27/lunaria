import { createClient } from '@/utils/supabase/client';

export const updateSavingsAccountService = async (savingsAccount: SavingsAccount): Promise<SavingsAccount> => {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('savings_accounts')

            .upsert({ ...savingsAccount })
            .eq('id', savingsAccount.id)
            .select();

        if (error) console.error('[ERROR] updating savingsAccount: ', error.message);
        return data?.[0] as SavingsAccount;
    } catch (error: any) {
        console.error('Error inserting savingsAccount:', error);
        throw error;
    }
};
