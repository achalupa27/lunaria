export const readSavingsAccountsService = async (email: any, supabaseClient: any) => {
    const { data: saving, error } = await supabaseClient.from('savings_accounts').select(`*`).eq('user_email', email);
    if (error) {
        console.error('Error in readSavingsAccountsService: ', error);
    } else {
        return (saving as SavingsAccount[]) ?? [];
    }
};
