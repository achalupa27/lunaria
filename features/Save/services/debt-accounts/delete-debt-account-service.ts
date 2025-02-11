import { createClient } from '@/utils/supabase/client';

export const deleteDebtAccountService = async (id: any) => {
    const supabase = createClient();

    const { error } = await supabase.from('debt_accounts').delete().eq('id', id);
    if (error) console.log('Error deleting debt account: ', error.message);
};
