import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Modal from '@/components/ui/modal';

import { selectUser } from '@/redux/slices/user-slice';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

type Props = {
    closeForm: any;
    selectedSpend?: Spend;
};

const SettingsForm = ({ closeForm, selectedSpend }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit: SubmitHandler<any> = (spend: Spend) => {
        if (user) {
        } else {
            console.error('[ERROR] Could not add spend. [REASON] No user.');
        }
    };

    return (
        <Modal title={'Settings'} closeModal={closeForm} headerStyle={'text-black'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'></form>
        </Modal>
    );
};

export default SettingsForm;
