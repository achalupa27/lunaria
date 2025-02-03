export const updateSaveService = async (save: Save, supabaseClient: any): Promise<Save> => {
    try {
        const { data, error } = await supabaseClient
            .from('saving')
            .upsert({ ...save })
            .eq('id', save.id)
            .select();

        if (error) console.error('[ERROR] updating save: ', error.message);

        return data;
    } catch (error: any) {
        console.error('Error inserting save:', error);
        throw error;
    }
};
