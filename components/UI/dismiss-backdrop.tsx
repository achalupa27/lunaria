type Props = {
    children: React.ReactNode;
    closePopup: () => void;
};

const DismissBackdrop = ({ children, closePopup }: Props) => {
    const handleBackdropClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            closePopup();
        }
    };

    return (
        <div className='absolute left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-primary/60' onClick={handleBackdropClick}>
            {children}
        </div>
    );
};

export default DismissBackdrop;
