import { createClient } from '@/utils/supabase/client';

export const readSpendsService = async () => {
    try {
        const supabase = createClient(); // Ensure the supabase client is created
        const { data: user, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            throw new Error('Failed to retrieve user information.');
        }

        const { data: spending, error } = await supabase.from('spending').select(`*`).eq('user_id', user.user.id);

        if (error) {
            throw new Error(`Failed to fetch spends: ${error.message}`);
        }

        return spending as Spend[];
    } catch (error) {
        console.error('[ERROR] in readSpendsService:', error);
        throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred while fetching spends.');
    }
};
