import React from 'react';

type Props = {
    label: string;
    isRequired: boolean;
    width?: string | undefined;
};

const InputLabel = ({ label, isRequired, width }: Props) => {
    return (
        <label className='flex justify-end whitespace-nowrap'>
            {label}
            {isRequired && <span className='text-red-500'>*</span>}:
        </label>
    );
};

export default InputLabel;
