import { createClient } from '@/utils/supabase/client';

export const readRecurringExpensesService = async () => {
    try {
        const supabase = createClient();
        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            throw new Error('Failed to retrieve user information.');
        }

        const { data: recurringExpenses, error } = await supabase.from('recurring_expenses').select(`*`).eq('user_id', user.user.id);

        if (error) {
            throw new Error(`Failed to fetch recurring expenses: ${error.message}`);
        }

        return recurringExpenses as RecurringExpense[];
    } catch (error) {
        console.error('[ERROR] in readRecurringExpensesService:', error);
        throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred while fetching recurring expenses.');
    }
};
