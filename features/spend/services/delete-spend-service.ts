import { createClient } from '@/utils/supabase/client';

export const deleteSpendService = async (id: any) => {
    const supabase = createClient();

    const { error } = await supabase.from('spending').delete().eq('id', id);
    if (error) console.log('Error deleting spend: ', error.message);
};
