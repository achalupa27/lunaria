import { createClient } from '@/utils/supabase/client';

export const readBudgetsService = async () => {
    try {
        const supabase = createClient();
        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            throw new Error('Failed to retrieve user information.');
        }

        const { data: budgets, error } = await supabase.from('budgets').select(`*`).eq('user_id', user.user.id);

        if (error) {
            throw new Error(`Failed to fetch budgets: ${error.message}`);
        }

        return budgets as Budget[];
    } catch (error) {
        console.error('[ERROR] in readBudgetsService:', error);
        throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred while fetching budgets.');
    }
};
