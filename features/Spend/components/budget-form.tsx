import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSpending, selectSpending, setSpending, updateSpendingState } from '@/redux/slices/spendSlice';
import Modal from '@/components/ui/modal';

import { selectUser } from '@/redux/slices/userSlice';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

type Props = {
    closeForm: any;
    selectedSpend?: Spend;
};

const BudgetForm = ({ closeForm, selectedSpend }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const spends = useAppSelector(selectSpending);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit: SubmitHandler<any> = (spend: Spend) => {
        if (user) {
        } else {
            console.error('[ERROR] Could not add spend. [REASON] No user.');
        }
    };

    return (
        <Modal title={'Budgets'} closeModal={closeForm} headerStyle={'text-black'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'></form>
        </Modal>
    );
};

export default BudgetForm;
