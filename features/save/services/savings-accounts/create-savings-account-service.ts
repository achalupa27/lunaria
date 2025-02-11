import { createClient } from '@/utils/supabase/client';

export const createSavingsAccountService = async (savingAccount: Omit<SavingsAccount, 'id'>) => {
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Failed to retrieve user information.');
    }

    const { data: insertedSave, error } = await supabase
        .from('savings_accounts')
        .insert({ ...savingAccount })
        .select();

    if (error) console.error('[API ERROR] inserting savingAccount: ', error);
    else return insertedSave[0];
};
