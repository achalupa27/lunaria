export const updateSpendService = async (spend: Spend, supabaseClient: any): Promise<Spend> => {
    try {
        const { data, error } = await supabaseClient
            .from('spending')
            .upsert({ ...spend })
            .eq('id', spend.id)
            .select();

        if (error) console.error('[ERROR] updating spend: ', error.message);

        return data;
    } catch (error: any) {
        console.error('Error inserting spend:', error);
        throw error;
    }
};
