export const createMake = async (make: Make, supabaseClient: any) => {
    const { data: insertedMake, error } = await supabaseClient
        .from('making')
        .insert({ ...make })
        .select();

    if (error) console.error('[API ERROR] inserting make: ', error);
    else return insertedMake[0];
};
