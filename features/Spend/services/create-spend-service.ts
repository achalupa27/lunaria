export const createSpendService = async (spend: Omit<Spend, 'id'>, supabaseClient: any) => {
    const { data: insertedSpend, error } = await supabaseClient
        .from('spending')
        .insert({ ...spend })
        .select();

    if (error) console.error('[API ERROR] inserting spend: ', error);
    else return insertedSpend[0];
};
