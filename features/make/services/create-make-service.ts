import { createClient } from '@/utils/supabase/client';

export const createMakeService = async (make: Omit<Make, 'id'>) => {
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();

    const { data: insertedMake, error } = await supabase
        .from('making')
        .insert({ ...make })
        .select();

    if (error) console.error('[API ERROR] inserting make: ', error);
    else return insertedMake[0];
};
