import { createClient } from '@/utils/supabase/client';

export const updateSaveService = async (save: Save): Promise<Save> => {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('saving')
            .upsert({ ...save })
            .eq('id', save.id)
            .select();

        if (error) console.error('[ERROR] updating save: ', error.message);

        return data?.[0];
    } catch (error: any) {
        console.error('Error inserting save:', error);
        throw error;
    }
};
