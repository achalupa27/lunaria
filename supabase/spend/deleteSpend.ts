export const deleteSpend = async (id: any, supabaseClient: any) => {
    const { error } = await supabaseClient.from('spending').delete().eq('id', id);
    if (error) console.log('Error deleting spend: ', error.message);
};
