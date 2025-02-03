export const deleteMakeService = async (id: any, supabaseClient: any) => {
    const { error } = await supabaseClient.from('making').delete().eq('id', id);
    if (error) console.log('Error deleting make: ', error.message);
};
