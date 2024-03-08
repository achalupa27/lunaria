export const createMake = async (make: Make, supabaseClient: any, email: any) => {
    const { data: insertedMake, error } = await supabaseClient.from('making').insert({ user_email: email, date: make.date, amount: make.amount, source: make.source }).select();

    if (error) console.error('[API ERROR] inserting make: ', error);
    else return insertedMake[0].id;
};
