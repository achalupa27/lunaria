export const deleteSave = async (id: any, supabaseClient: any) => {
    const { error } = await supabaseClient.from('saving').delete().eq('id', id);
    if (error) console.log('Error deleting save: ', error.message);
};
