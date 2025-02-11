import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/components/ui/modal';
import { currencyCategories, incomeSources } from '@/constants';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useMakeMutations } from '../hooks/use-make-mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type Props = {
    closeForm: any;
    selectedMake?: Make;
};

const FormSchema = z.object({
    source: z.string({
        required_error: 'An income source is required.',
    }),
    amount: z.coerce.number(),
    date: z.date({
        required_error: 'A date is required.',
    }),
});

const MakeForm = ({ closeForm, selectedMake }: Props) => {
    const user = true;

    const form = useForm({
        defaultValues: {
            ...selectedMake,
        },
        resolver: zodResolver(FormSchema),
    });

    const { createMakeMutation, updateMakeMutation, deleteMakeMutation } = useMakeMutations();

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        if (user) {
            if (selectedMake) {
                const updatedMake: Omit<Make, 'user_id'> = {
                    ...data,
                    id: selectedMake.id,
                };

                updateMakeMutation.mutate(updatedMake);
            } else {
                const newMake: Omit<Make, 'id' | 'user_id'> = {
                    ...data,
                };

                createMakeMutation.mutate(newMake);
            }
        } else {
            console.error('[ERROR] Could not add make. [REASON] No user.');
        }
        closeForm();
    };

    const handleDelete = () => {
        selectedMake && deleteMakeMutation.mutate(selectedMake.id);
        closeForm();
    };

    return (
        <Modal title={selectedMake ? 'Edit Making' : 'New Making'} closeModal={closeForm} headerStyle={'text-black'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='amount'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Amount</FormLabel>
                                <Input className='transition-colors hover:bg-zinc-100' type='number' {...field} placeholder='Amount' />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='source'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Source</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className='transition-colors hover:bg-zinc-100'>
                                        <SelectValue placeholder='Source' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {incomeSources.map((source) => (
                                            <SelectItem key={source} value={source}>
                                                {source}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={'outline'} className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                {field.value ? format(field.value, 'PPP') : <span>Date</span>}
                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-auto p-0' align='start'>
                                        <Calendar mode='single' selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('1900-01-01')} initialFocus />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={`flex pt-4 ${selectedMake ? 'justify-between' : 'justify-end'}`}>
                        {selectedMake && (
                            <Button type='button' onClick={handleDelete} variant='destructive' size='icon'>
                                <Trash />
                            </Button>
                        )}
                        <div className='flex space-x-3'>
                            <Button variant='secondary' onClick={closeForm}>
                                Cancel
                            </Button>
                            <Button type='submit'>Save</Button>
                        </div>
                    </div>
                </form>
            </Form>
        </Modal>
    );
};

export default MakeForm;
