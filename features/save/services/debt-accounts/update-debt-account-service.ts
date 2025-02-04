export const updateDebtAccountService = async (debtAccount: DebtAccount, supabaseClient: any): Promise<DebtAccount> => {
    try {
        const { data, error } = await supabaseClient
            .from('debt_accounts')
            .upsert({ ...debtAccount })
            .eq('id', debtAccount.id)
            .select();

        if (error) console.error('[ERROR] updating debtAccount: ', error.message);
        return data[0] as DebtAccount;
    } catch (error: any) {
        console.error('Error inserting debtAccount:', error);
        throw error;
    }
};
