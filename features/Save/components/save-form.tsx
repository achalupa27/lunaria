import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '@/redux/hooks';
import Modal from '@/components/ui/modal';
import { savingAccounts } from '@/constants';
import { selectUser } from '@/redux/slices/userSlice';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useSaveMutations } from '../hooks/use-save-mutations';
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
    selectedSave?: Save;
};

const FormSchema = z.object({
    type: z.string({
        required_error: 'A type is required.',
    }),
    account: z.string({
        required_error: 'An account is required.',
    }),
    amount: z.coerce.number(),
    date: z.date({
        required_error: 'A date is required.',
    }),
});

const SaveForm = ({ closeForm, selectedSave }: Props) => {
    const user = useAppSelector(selectUser);
    const { createSaveMutation, updateSaveMutation, deleteSaveMutation } = useSaveMutations();

    const form = useForm({
        defaultValues: {
            ...selectedSave,
            type: selectedSave?.type || 'Deposit', // Set the default value of 'type'
        },
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        console.log('save: ', data);
        if (user) {
            if (selectedSave) {
                const updatedSave: Save = {
                    ...data,
                    user_email: user!.email,
                    id: selectedSave.id,
                };

                updateSaveMutation.mutate(updatedSave);
            } else {
                const newSave: Omit<Save, 'id'> = {
                    ...data,
                    user_email: user!.email,
                };

                createSaveMutation.mutate(newSave);
            }
        } else {
            console.error('[ERROR] Could not add save. [REASON] No user.');
        }
        closeForm();
    };

    const handleDelete = () => {
        selectedSave && deleteSaveMutation.mutate(selectedSave.id);
        closeForm();
    };

    const [type, setType] = useState<'Deposit' | 'Withdrawal'>('Deposit');

    return (
        <Modal title={selectedSave ? 'Edit Saving' : 'New Saving'} closeModal={closeForm} headerStyle={'text-black'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='type'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <div className='border-orange-0 relative flex w-full overflow-hidden rounded-lg  bg-white dark:bg-black'>
                                    <div className={`absolute left-0 top-0 h-full w-1/2 rounded-lg transition-transform duration-200 dark:bg-white ${type === 'Withdrawal' ? 'translate-x-full bg-red-600' : 'translate-x-0 bg-green-500 '}`}></div>

                                    <div
                                        className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${type === 'Deposit' ? 'text-white dark:text-black' : 'text-zinc-500'}`}
                                        onClick={() => {
                                            setType('Deposit');
                                            form.setValue('type', 'Deposit');
                                        }}>
                                        Deposit
                                    </div>

                                    <div
                                        className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${type === 'Withdrawal' ? 'text-white dark:text-black' : 'text-zinc-500'}`}
                                        onClick={() => {
                                            setType('Withdrawal');
                                            form.setValue('type', 'Withdrawal');
                                        }}>
                                        Withdrawal
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        name='account'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Account</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className='transition-colors hover:bg-zinc-100'>
                                        <SelectValue placeholder='Account' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {savingAccounts.map((account) => (
                                            <SelectItem key={account} value={account}>
                                                {account}
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
                    <div className={`flex pt-4 ${selectedSave ? 'justify-between' : 'justify-end'}`}>
                        {selectedSave && (
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

export default SaveForm;
