import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addMaking, selectMaking, setMaking, updateMakingState } from '@/redux/slices/makeSlice';
import Modal from '@/components/ui/modal';
import { selectUser } from '@/redux/slices/userSlice';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
type Props = {
    closeForm: any;
    selectedMake?: Make;
};

const MakeSettings = ({ closeForm, selectedMake }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const makes = useAppSelector(selectMaking);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit: SubmitHandler<any> = (make: any) => {
        if (user) {
        } else {
            console.error('[ERROR] Could not add make. [REASON] No user.');
        }
        closeForm();
    };

    return (
        <Modal title={'Make Settings'} closeModal={closeForm} headerStyle={'text-black'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'></form>
        </Modal>
    );
};

export default MakeSettings;
