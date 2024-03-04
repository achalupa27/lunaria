export const updateMake = async (make: Make, supabaseClient: any) => {
    const { error } = await supabaseClient
        .from('making')
        .upsert({ ...make })
        .eq('id', make.id);
    if (error) console.error('[ERROR] updating make: ', error.message);
};
