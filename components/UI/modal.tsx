import CloseButton from './buttons/CloseButton';
import DismissBackdrop from './dismiss-backdrop';

type Props = {
    children: React.ReactNode;
    title: string;
    closeModal: () => void;
    headerStyle?: string;
};

const Modal = ({ children, title, closeModal, headerStyle }: Props) => {
    return (
        <DismissBackdrop closePopup={closeModal}>
            <div className='z-50 w-[420px] rounded-lg bg-secondary p-8 dark:bg-primary'>
                <div className='mb-4 flex items-center justify-between'>
                    <h2 className={`flex w-full text-xl ${headerStyle}`}>{title}</h2>
                    <CloseButton handleClose={closeModal} />
                </div>
                {children}
            </div>
        </DismissBackdrop>
    );
};

export default Modal;
