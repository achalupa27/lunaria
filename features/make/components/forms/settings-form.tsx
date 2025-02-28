import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '@/store/hooks';
import Modal from '@/components/ui/modal';

type Props = {
    closeForm: any;
};

const SettingsForm = ({ closeForm }: Props) => {
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit: SubmitHandler<any> = (make: any) => {
        closeForm();
    };

    return (
        <Modal title={'Make Settings'} closeModal={closeForm} headerStyle={'text-black'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'></form>
        </Modal>
    );
};

export default SettingsForm;
