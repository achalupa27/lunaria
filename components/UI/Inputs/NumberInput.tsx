import React from 'react';

type Props = {
    register: any;
    label: string;
    registerValue: string;
    isRequired?: boolean;
    placeholder?: string;
    readOnly?: boolean;
};

const NumberInput = ({ register, label, registerValue, isRequired, placeholder, readOnly }: Props) => {
    return (
        <div className='flex w-full items-center space-x-2'>
            <label className='flex justify-end whitespace-nowrap'>
                {label}
                {isRequired && <span className='text-red-500'>*</span>}:
            </label>
            <input {...register(registerValue)} type='number' step='any' placeholder={placeholder || label} className='w-full bg-transparent pl-1 text-right focus:outline-none' required={isRequired} readOnly={readOnly} />
        </div>
    );
};

export default NumberInput;
