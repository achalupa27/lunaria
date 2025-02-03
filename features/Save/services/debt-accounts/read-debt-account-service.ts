export const readDebtAccountsService = async (email: any, supabaseClient: any) => {
    const { data: saving, error } = await supabaseClient.from('debt_accounts').select(`*`).eq('user_email', email);
    if (error) {
        console.error('Error in readDebtAccountsService: ', error);
    } else {
        return saving as Save[];
    }
};
