import { createClient } from '@/utils/supabase/client';

export const createBudgetService = async (budget: Omit<Budget, 'id' | 'created_at'>) => {
    const supabase = createClient();

    // Get the current user
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        throw new Error('Failed to retrieve user information.');
    }

    const { data: insertedBudget, error } = await supabase
        .from('budgets')
        .insert({ ...budget, user_id: user.user.id })
        .select();

    if (error) console.error('[API ERROR] inserting budget: ', error);
    else return insertedBudget[0];
};
