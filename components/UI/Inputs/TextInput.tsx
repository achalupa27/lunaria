import { useState, useEffect, useRef } from 'react';

type TextInputProps = {
    label: string;
    registerValue: string;
    register: any;
    errors?: any;
    isRequired?: boolean;
    maxLength?: number;
    helper?: string;
    disabled?: boolean;
};

const TextInput = ({ label, registerValue, register, errors, isRequired, maxLength, helper, disabled }: TextInputProps) => {
    const [isFocused, setIsFocused] = useState(false); // To manage border states
    const [hasValue, setHasValue] = useState(false); // To manage label position

    useEffect(() => {
        // Retrieve the current value of the input from React Hook Form
        const element = document.querySelector<HTMLInputElement>(`[name="${registerValue}"]`);
        if (element && element.value) {
            setHasValue(!!element.value); // Update state if input has an initial value
        }
    }, [registerValue]);

    console.log('isFocused: ', isFocused);

    return (
        <div className='relative w-full'>
            {/* Floating Label */}
            <label className={`pointer-events-none absolute left-3 bg-white px-1 ${isFocused ? 'font-medium text-black' : 'text-zinc-500'} transition-all duration-200 dark:bg-black ${isFocused || hasValue ? '-top-2 text-xs' : 'top-2 text-base'}`}>
                {label} {isRequired && <span className='text-red-500'>*</span>}
            </label>

            {/* Input Field */}
            <input
                {...register(registerValue, {
                    onChange: (e: any) => setHasValue(!!e.target.value), // Update hasValue on input change
                    onBlur: (e: any) => {
                        setIsFocused(false);
                        setHasValue(!!e.target.value); // Update hasValue on blur
                    },
                })}
                className='h-10 w-full rounded-lg border px-3 pb-3 pt-4 text-sm focus:border-2 focus:border-black focus:outline-none disabled:opacity-50'
                required={isRequired}
                maxLength={maxLength}
                onFocus={() => setIsFocused(true)}
                disabled={disabled}
            />

            {/* Error Message */}
            {errors?.[registerValue] && (
                <span className='text-red-500' role='alert'>
                    {errors[registerValue].message || 'Invalid input'}
                </span>
            )}

            {/* Helper Text */}
            {helper && <small className='text-zinc-500'>{helper}</small>}
        </div>
    );
};

export default TextInput;
