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
    account: z.string({
        required_error: 'An account is required.',
    }),
    balance: z.coerce.number(),
});

const DebtAccountForm = ({ closeForm }: Props) => {
    const form = useForm({
        defaultValues: {},
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        console.log('save: ', data);

        closeForm();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='account'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Account Name</FormLabel>
                            <Input className='transition-colors hover:bg-zinc-100' {...field} placeholder='Account Name' />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='balance'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel>Balance</FormLabel>
                            <Input className='transition-colors hover:bg-zinc-100' type='number' {...field} placeholder='Balance' />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className={`flex pt-4 ${true ? 'justify-between' : 'justify-end'}`}>
                    {true && (
                        <Button type='button' onClick={() => {}} variant='destructive' size='icon'>
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
    );
};

export default DebtAccountForm;
