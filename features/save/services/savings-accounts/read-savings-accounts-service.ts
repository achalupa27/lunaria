import { createClient } from '@/utils/supabase/client';

export const readSavingsAccountsService = async () => {
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Failed to retrieve user information.');
    }

    const { data: saving, error } = await supabase.from('savings_accounts').select(`*`).eq('user_id', user.user.id);
    if (error) {
        console.error('Error in readSavingsAccountsService: ', error);
    } else {
        return (saving as SavingsAccount[]) ?? [];
    }
};
