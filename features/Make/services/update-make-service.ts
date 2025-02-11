import { createClient } from '@/utils/supabase/client';

export const updateMakeService = async (make: Make): Promise<Make> => {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('making')
            .upsert({ ...make })
            .eq('id', make.id)
            .select();

        if (error) console.error('[ERROR] updating save: ', error.message);

        return data?.[0];
    } catch (error: any) {
        console.error('Error inserting save:', error);
        throw error;
    }
};
