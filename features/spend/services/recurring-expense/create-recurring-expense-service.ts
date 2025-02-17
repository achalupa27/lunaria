import { createClient } from '@/utils/supabase/client';

export const createRecurringExpenseService = async (recurringExpense: Omit<RecurringExpense, 'id' | 'created_at'>) => {
    const supabase = createClient();

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Failed to retrieve user information.');
    }

    const { data: insertedExpense, error } = await supabase
        .from('recurring_expenses')
        .insert({ ...recurringExpense, user_id: user.user.id })
        .select();

    if (error) console.error('[API ERROR] inserting recurring expense: ', error);
    else return insertedExpense[0];
};
