import { createClient } from '@/utils/supabase/client';

export const updateBudgetService = async (budget: Budget): Promise<Budget> => {
    try {
        const supabase = createClient();

        const { data, error } = await supabase
            .from('budgets')
            .upsert({ ...budget })
            .eq('id', budget.id)
            .select();

        if (error) console.error('[ERROR] updating budget: ', error.message);

        return data?.[0];
    } catch (error: any) {
        console.error('Error updating budget:', error);
        throw error;
    }
};
