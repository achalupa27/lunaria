import { useState, useEffect, useRef } from 'react';

type TextInputProps = {
    label: string;
    registerValue: string;
    register: any;
    errors?: any;
    isRequired?: boolean;
    maxLength?: number;
    placeholder?: string;
    disabled?: boolean;
};

const TextInput = ({ registerValue, register, isRequired, maxLength, disabled, placeholder }: TextInputProps) => {
    return (
        <div className='relative w-full'>
            <input {...register(registerValue)} className='h-10 w-full rounded-lg border px-3 pb-3 pt-4 text-sm focus:border-2 focus:border-black focus:outline-none disabled:opacity-50' placeholder={placeholder} required={isRequired} maxLength={maxLength} disabled={disabled} />
        </div>
    );
};

export default TextInput;
