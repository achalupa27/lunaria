import { createClient } from '@/utils/supabase/client';

export const updateRecurringExpenseService = async (recurringExpense: RecurringExpense): Promise<RecurringExpense> => {
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('recurring_expenses')
            .upsert({ ...recurringExpense })
            .eq('id', recurringExpense.id)
            .select();

        if (error) console.error('[ERROR] updating recurring expense: ', error.message);

        return data?.[0];
    } catch (error: any) {
        console.error('Error updating recurring expense:', error);
        throw error;
    }
};
