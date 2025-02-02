import { useState, useEffect, useRef } from 'react';

type Props = {
    register: any;
    label: string;
    registerValue: string;
    isRequired?: boolean;
    today?: boolean;
};

const DateInput = ({ register, label, registerValue, isRequired, today }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    // Calculate today's date in YYYY-MM-DD format
    const todayDate = new Date().toISOString().split('T')[0];

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

            {/* Date Input */}
            <input
                {...register(registerValue, {
                    onChange: (e: any) => setHasValue(!!e.target.value), // Update hasValue on input change
                    onBlur: (e: any) => {
                        setIsFocused(false);
                        setHasValue(!!e.target.value); // Update hasValue on blur
                    },
                })}
                type='date'
                placeholder='Select a date'
                onFocus={() => setIsFocused(true)}
                className={`picker h-10 w-full rounded-lg border px-3 pb-2 pt-3 text-sm ${isFocused ? 'border-2 border-black outline-none' : ''} disabled:opacity-50`}
                required={isRequired}
                defaultValue={today ? todayDate : undefined}
            />

            {/* Error Message */}
            {/* You can customize this error handling according to your needs */}
            {false && (
                <span className='text-red-500' role='alert'>
                    Error Message Here
                </span>
            )}
        </div>
    );
};

export default DateInput;
