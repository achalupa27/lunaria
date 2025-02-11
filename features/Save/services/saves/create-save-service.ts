import { createClient } from '@/utils/supabase/client';

export const createSaveService = async (save: Omit<Save, 'id'>) => {
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Failed to retrieve user information.');
    }

    const { data: insertedSave, error } = await supabase
        .from('saving')
        .insert({ ...save })
        .select();

    if (error) console.error('[API ERROR] inserting save: ', error);
    else return insertedSave[0];
};
