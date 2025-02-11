import { createClient } from '@/utils/supabase/client';

export const readSavesService = async () => {
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Failed to retrieve user information.');
    }

    const { data: saving, error } = await supabase.from('saving').select(`*`).eq('user_id', user.user.id);
    if (error) {
        console.error('Error in readSaving: ', error);
    } else {
        return saving as Save[];
    }
};
