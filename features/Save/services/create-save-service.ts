export const createSaveService = async (save: Omit<Save, 'id'>, supabaseClient: any) => {
    const { data: insertedSave, error } = await supabaseClient
        .from('saving')
        .insert({ ...save })
        .select();

    if (error) console.error('[API ERROR] inserting save: ', error);
    else return insertedSave[0];
};
