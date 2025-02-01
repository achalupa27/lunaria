import React, { useState, useEffect, useRef } from 'react';

type Props = {
    register: any;
    label: string;
    registerValue: string;
    isRequired?: boolean;
    categories: any;
    defaultOption?: any;
    width?: string;
};

const SelectInput = ({ register, label, registerValue, isRequired, categories, defaultOption, width }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
        // Retrieve the current value of the input from React Hook Form
        const element = document.querySelector<HTMLInputElement>(`[name="${registerValue}"]`);
        if (element && element.value) {
            setHasValue(!!element.value); // Update state if input has an initial value
        }
    }, [registerValue]);

    return (
        <div className='relative w-full'>
            {/* Floating Label */}
            <label className={`pointer-events-none absolute left-3 bg-white px-1 ${isFocused ? 'font-medium text-black' : 'text-zinc-500'} transition-all duration-200 dark:bg-black ${isFocused || hasValue ? '-top-2 text-xs' : 'top-2 text-base'}`}>
                {label} {isRequired && <span className='text-red-500'>*</span>}
            </label>

            {/* Select Input */}
            <select
                {...register(registerValue, {
                    onChange: (e: any) => setHasValue(!!e.target.value), // Update hasValue on input change
                    onBlur: (e: any) => {
                        setIsFocused(false);
                        setHasValue(!!e.target.value); // Update hasValue on blur
                    },
                })}
                defaultValue={defaultOption}
                className={`h-10 rounded border border-zinc-400 px-3 py-2 pt-3 text-sm focus:border-2 focus:border-black focus:outline-none disabled:opacity-50 ${width || 'w-full'}`}
                onFocus={() => setIsFocused(true)}
                required={isRequired}>
                <option value=''></option>
                {categories.map((category: any, index: any) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {/* Error Message */}
            {false && (
                <span className='text-red-500' role='alert'>
                    Error Message Here
                </span>
            )}
        </div>
    );
};

export default SelectInput;
