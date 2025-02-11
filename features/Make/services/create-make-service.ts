import { createClient } from '@/utils/supabase/client';

export const createMakeService = async (make: Omit<Make, 'id' | 'user_id'>): Promise<Make> => {
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) console.error('[API ERROR] getting user: ', userError);

    const { data: newMake, error } = await supabase
        .from('making')
        .insert({ ...make, user_id: user.user?.id })
        .select();

    if (error) console.error('[API ERROR] inserting make: ', error);

    return newMake?.[0] as Make;
};
