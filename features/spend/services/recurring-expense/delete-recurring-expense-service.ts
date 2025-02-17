import { createClient } from '@/utils/supabase/client';

export const deleteRecurringExpenseService = async (id: string) => {
    const supabase = createClient();

    const { error } = await supabase.from('recurring_expenses').delete().eq('id', id);
    if (error) console.log('Error deleting recurring expense: ', error.message);
};
