export const createSavingsAccountService = async (savingAccount: Omit<SavingsAccount, 'id'>, supabaseClient: any) => {
    const { data: insertedSave, error } = await supabaseClient
        .from('savings_accounts')
        .insert({ ...savingAccount })
        .select();

    if (error) console.error('[API ERROR] inserting savingAccount: ', error);
    else return insertedSave[0];
};
