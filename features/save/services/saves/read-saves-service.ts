export const readSavesService = async (email: any, supabaseClient: any) => {
    const { data: saving, error } = await supabaseClient.from('saving').select(`*`).eq('user_email', email);
    if (error) {
        console.error('Error in readSaving: ', error);
    } else {
        return saving as Save[];
    }
};
