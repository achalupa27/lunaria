export const updateMakeService = async (make: Make, supabaseClient: any): Promise<Make> => {
    try {
        const { data, error } = await supabaseClient
            .from('making')
            .upsert({ ...make })
            .eq('id', make.id)
            .select();

        if (error) console.error('[ERROR] updating save: ', error.message);

        return data;
    } catch (error: any) {
        console.error('Error inserting save:', error);
        throw error;
    }
};
