import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '@/store/hooks';
import Modal from '@/components/ui/modal';

type Props = {
    closeForm: any;
    selectedSpend?: Spend;
};

const SettingsForm = ({ closeForm, selectedSpend }: Props) => {
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit: SubmitHandler<any> = (spend: Spend) => {
        if (true) {
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
