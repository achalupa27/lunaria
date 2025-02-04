export const deleteDebtAccountService = async (id: any, supabaseClient: any) => {
    const { error } = await supabaseClient.from('debt_accounts').delete().eq('id', id);
    if (error) console.log('Error deleting debt account: ', error.message);
};
