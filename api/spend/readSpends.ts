export const readSpending = async (email: any, supabaseClient: any, dispatch: any, setSpending: any) => {
    const { data: spending, error } = await supabaseClient.from('spending').select(`*`).eq('user_email', email);
    if (error) {
        console.error('Error in readSpending: ', error);
    } else {
        dispatch(setSpending(spending as Spend[]));
    }
};
