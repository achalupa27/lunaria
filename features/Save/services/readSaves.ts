export const readSaving = async (email: any, supabaseClient: any, dispatch: any, setSaving: any) => {
    const { data: saving, error } = await supabaseClient.from('saving').select(`*`).eq('user_email', email);
    if (error) {
        console.error('Error in readSaving: ', error);
    } else {
        dispatch(setSaving(saving as Save[]));
    }
};
