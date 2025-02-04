export const createDebtAccountService = async (debtAccount: Omit<DebtAccount, 'id'>, supabaseClient: any) => {
    const { data: insertedDebtAccount, error } = await supabaseClient
        .from('debt_accounts')
        .insert({ ...debtAccount })
        .select();

    if (error) console.error('[API ERROR] inserting debtAccount: ', error);
    else return insertedDebtAccount[0];
};
