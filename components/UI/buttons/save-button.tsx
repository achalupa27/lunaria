import React from 'react';

type Props = {
    styling: string;
};

const SaveButton = ({ styling }: Props) => {
    return (
        <button type='submit' className={`${styling} flex w-32 items-center justify-center space-x-1 rounded-lg py-2 transition duration-100 dark:text-primary`}>
            <i className='fi fi-rr-check'></i>
            <span>Save</span>
        </button>
    );
};

export default SaveButton;
