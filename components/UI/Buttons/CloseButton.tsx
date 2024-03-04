type Props = {
    handleClose: any;
};

const CloseButton = ({ handleClose }: Props) => {
    return (
        <button className='flex cursor-pointer items-center justify-center transition duration-200 hover:text-l-red' onClick={handleClose}>
            <i className='fi fi-rr-cross' />
        </button>
    );
};

export default CloseButton;
