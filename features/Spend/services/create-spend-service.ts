import { createClient } from '@/utils/supabase/client';

export const createSpendService = async (spend: Omit<Spend, 'id'>) => {
    const supabase = createClient();

    const { data: insertedSpend, error } = await supabase
        .from('spending')
        .insert({ ...spend })
        .select();

    if (error) console.error('[API ERROR] inserting spend: ', error);
    else return insertedSpend[0];
};
