export const updateSave = async (save: Save, supabaseClient: any) => {
    const { error } = await supabaseClient
        .from('saving')
        .upsert({ ...save })
        .eq('id', save.id);
    if (error) console.error('[ERROR] updating save: ', error.message);
};
