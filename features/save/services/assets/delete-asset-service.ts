import { createClient } from '@/utils/supabase/client';

export const deleteAssetService = async (id: string) => {
    const supabase = createClient();

    const { error } = await supabase.from('assets').delete().eq('id', id);

    if (error) console.log('Error deleting asset: ', error.message);
};
