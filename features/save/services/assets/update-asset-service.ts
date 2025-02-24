import { createClient } from '@/utils/supabase/client';

export const updateAssetService = async (asset: Asset): Promise<Asset> => {
    const supabase = createClient();

    try {
        const { data, error } = await supabase
            .from('assets')
            .upsert({ ...asset })
            .eq('id', asset.id)
            .select();

        if (error) console.error('[ERROR] updating asset: ', error.message);
        return data?.[0] as Asset;
    } catch (error: any) {
        console.error('Error updating asset:', error);
        throw error;
    }
};
