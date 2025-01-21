export const readMaking = async (email: any, supabaseClient: any, dispatch: any, setMaking: any) => {
    const { data: making, error } = await supabaseClient.from('making').select(`*`).eq('user_email', email);
    if (error) {
        console.error('Error in readMaking: ', error);
    } else {
        dispatch(setMaking(making as Make[]));
    }
};
