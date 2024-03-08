import React from 'react';

type Props = {
    register: any;
    label?: string;
    registerValue: string;
    isRequired?: boolean;
    categories: any;
    defaultOption?: any;
};

const SelectInput = ({ register, label, registerValue, isRequired, categories, defaultOption }: Props) => {
    return (
        <div className='flex w-full items-center space-x-2'>
            {label && (
                <label className='flex justify-end whitespace-nowrap'>
                    {label}
                    {isRequired && <span className='text-red-500'>*</span>}:
                </label>
            )}
            <select defaultValue={defaultOption} {...register(registerValue)} className='input-field w-full text-right dark:bg-primary' required={isRequired}>
                {categories.map((category: any, index: any) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;
