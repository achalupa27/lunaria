import Modal from '@/components/ui/modal';

type Props = {
    closeForm: () => void;
};

const SettingsForm = ({ closeForm }: Props) => {
    return (
        <Modal title='Settings' closeModal={closeForm} headerStyle='text-black'>
            Settings
        </Modal>
    );
};

export default SettingsForm;
