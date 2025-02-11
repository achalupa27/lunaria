import { createClient } from '@utils/supabase/client';

export const readMakesService = async () => {
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Failed to retrieve user information.');
    }

    const { data: making, error } = await supabase.from('making').select(`*`).eq('user_id', user.user.id);

    if (error) {
        console.error('Error in readMaking: ', error);
    } else {
        return (making as Make[]) || [];
    }
};
