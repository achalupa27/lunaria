import { createClient } from '@/utils/supabase/client';

export const deleteSavingsAccountService = async (id: any) => {
    const supabase = createClient();

    const { error } = await supabase.from('savings_accounts').delete().eq('id', id);
    if (error) console.log('Error deleting savings account: ', error.message);
};
