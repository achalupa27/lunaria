import { createClient } from '@/utils/supabase/client';

export const createAssetService = async (asset: Omit<Asset, 'id'>) => {
    const supabase = createClient();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Failed to retrieve user information.');
    }

    const { data: insertedAsset, error } = await supabase
        .from('assets')
        .insert({ ...asset, user_id: user.user.id })
        .select();

    if (error) console.error('[API ERROR] inserting asset: ', error);
    else return insertedAsset[0];
};
