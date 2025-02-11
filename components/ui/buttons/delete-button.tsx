'use client';

const DeleteButton = ({ onClick }: any) => {
    return (
        <button type='button' onClick={onClick} className='flex w-10 items-center justify-center rounded-lg bg-red-300 py-2 transition duration-100 hover:bg-red-400 dark:text-primary'>
            <i className='fi fi-rr-trash' />
        </button>
    );
};

export default DeleteButton;
