export const deleteSavingsAccountService = async (id: any, supabaseClient: any) => {
    const { error } = await supabaseClient.from('savings_accounts').delete().eq('id', id);
    if (error) console.log('Error deleting savings account: ', error.message);
};
