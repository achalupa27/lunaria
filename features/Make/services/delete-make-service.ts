import { createClient } from '@/utils/supabase/client';

export const deleteMakeService = async (id: any) => {
    const supabase = createClient();

    const { error } = await supabase.from('making').delete().eq('id', id);
    if (error) console.log('Error deleting make: ', error.message);
};
