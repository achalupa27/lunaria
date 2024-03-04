type TextInputProps = {
    register: any;
    label: string;
    registerValue: string;
    placeholder?: string;
    errors?: any;
    isRequired?: boolean;
    maxLength?: number;
    helper?: string;
};

const TextInput = ({ register, label, registerValue, placeholder, errors, isRequired, maxLength, helper }: TextInputProps) => {
    return (
        <div className='flex w-full items-center space-x-2'>
            <label htmlFor={registerValue} className='flex justify-end whitespace-nowrap'>
                {label}
                {isRequired && <span className='text-red-500'>*</span>}:
            </label>
            <input {...register(registerValue, { maxLength: maxLength || 255 })} placeholder={placeholder || label} className='picker w-full bg-transparent pl-1 text-right focus:outline-none' required={isRequired} />
            {errors?.[registerValue] && errors?.[registerValue].type === 'maxLength' && (
                <span className='text-red-500' role='alert'>
                    Max length exceeded
                </span>
            )}
        </div>
    );
};

export default TextInput;
