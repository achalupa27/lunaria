import { createClient } from '@/utils/supabase/client';

export const readAssetsService = async () => {
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Failed to retrieve user information.');
    }

    const { data: assets, error } = await supabase.from('assets').select(`*`).eq('user_id', user.user.id);

    if (error) {
        console.error('Error in readAssetsService: ', error);
    } else {
        return assets as Asset[];
    }
};
