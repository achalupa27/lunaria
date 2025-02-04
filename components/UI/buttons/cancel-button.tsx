import React from 'react';

const CancelButton = ({ onClick }: any) => {
    return (
        <button type='button' onClick={onClick} className='flex w-32 items-center justify-center space-x-1 rounded-lg bg-l-slate py-2 transition duration-100 hover:bg-l-dark-slate dark:text-primary'>
            <span>Cancel</span>
        </button>
    );
};

export default CancelButton;
