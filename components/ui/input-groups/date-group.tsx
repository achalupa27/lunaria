import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../form';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../button';
import { Calendar } from '../calendar';
import { Control } from 'react-hook-form';

type DateGroupProps = {
    control: Control<any>;
    name: string;
    label: string;
    placeholder?: string;
    disableFutureDates?: boolean;
    disablePastDates?: boolean;
    minDate?: Date;
    maxDate?: Date;
};

const DateGroup = ({ control, name, label, placeholder, disableFutureDates = false, disablePastDates = false, minDate = new Date('1900-01-01'), maxDate }: DateGroupProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex flex-col'>
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button variant={'outline'} className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                    {field.value ? format(field.value, 'PPP') : <span>{placeholder || label}</span>}
                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                                mode='single'
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => {
                                    const isFutureDate = date > new Date();
                                    const isPastDate = date < (minDate || new Date('1900-01-01'));
                                    const isAfterMax = maxDate ? date > maxDate : false;

                                    return (disableFutureDates && isFutureDate) || (disablePastDates && isPastDate) || isPastDate || isAfterMax;
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DateGroup;
