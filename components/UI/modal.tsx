import { X } from 'lucide-react';
import { Button } from './button';
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
            <div className='z-50 w-[500px] rounded-xl border-2 border-orange-100 bg-secondary p-12 shadow dark:bg-primary'>
                <div className='mb-6 flex items-center justify-between'>
                    <h2 className={`flex w-full text-2xl ${headerStyle}`}>{title}</h2>
                    <Button size='icon' variant='ghost' onClick={closeModal}>
                        <X />
                    </Button>
                </div>
                {children}
            </div>
        </DismissBackdrop>
    );
};

export default Modal;
