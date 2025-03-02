import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormMessage } from '../form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';

type SelectGroupProps = {
    control: Control<any>;
    name: string;
    label: string;
    options: string[];
    placeholder: string;
};

const SelectGroup = ({ control, name, label, options, placeholder }: SelectGroupProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex flex-col'>
                    <FormLabel>{label}</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SelectGroup;
