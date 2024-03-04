export const createSave = async (save: Save, supabaseClient: any, email: any) => {
    const { data: insertedSave, error } = await supabaseClient.from('saving').insert({ user_email: email, type: save.type, date: save.date, amount: save.amount, account: save.account }).select();

    if (error) console.error('[API ERROR] inserting save: ', error);
    else return insertedSave[0].id;
};
