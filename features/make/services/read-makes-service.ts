export const readMakesService = async (email: any, supabaseClient: any) => {
    const { data: making, error } = await supabaseClient.from('making').select(`*`).eq('user_email', email);
    if (error) {
        console.error('Error in readMaking: ', error);
    } else {
        return making as Make[];
    }
};
