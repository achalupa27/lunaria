import { createClient } from '@/utils/supabase/client';

export const deleteSaveService = async (id: any) => {
    const supabase = createClient();

    const { error } = await supabase.from('saving').delete().eq('id', id);
    if (error) console.log('Error deleting save: ', error.message);
};
