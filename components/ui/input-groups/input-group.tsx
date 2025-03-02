import React from 'react';
import { Input } from '../input';
import { FormItem, FormMessage } from '../form';
import { FormLabel } from '../form';
import { FormField } from '../form';
import { Control } from 'react-hook-form';

type InputGroupProps = {
    control: Control<any>;
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    step?: string;
};

const InputGroup = ({ control, name, label, placeholder, type = 'text', step = '0.01' }: InputGroupProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex flex-col'>
                    <FormLabel>{label}</FormLabel>
                    <Input {...field} placeholder={placeholder} type={type} />
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default InputGroup;
