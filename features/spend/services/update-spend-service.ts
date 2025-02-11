import { createClient } from '@/utils/supabase/client';

export const updateSpendService = async (spend: Spend): Promise<Spend> => {
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('spending')
            .upsert({ ...spend })
            .eq('id', spend.id)
            .select();

        if (error) console.error('[ERROR] updating spend: ', error.message);

        return data?.[0];
    } catch (error: any) {
        console.error('Error inserting spend:', error);
        throw error;
    }
};
