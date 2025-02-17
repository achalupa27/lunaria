import { createClient } from '@/utils/supabase/client';

export const deleteBudgetService = async (id: string) => {
    const supabase = createClient();

    const { error } = await supabase.from('budgets').delete().eq('id', id);
    if (error) console.log('Error deleting budget: ', error.message);
};
