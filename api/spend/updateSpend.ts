export const updateSpend = async (spend: Spend, supabaseClient: any) => {
    const { error } = await supabaseClient
        .from('spending')
        .upsert({ ...spend })
        .eq('id', spend.id);
    if (error) console.error('[ERROR] updating spend: ', error.message);
};
