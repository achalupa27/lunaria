import { SubmitHandler, useForm } from 'react-hook-form';
import { currencyCategories, necessityCategories, spendingCategories } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Modal from '@/components/ui/modal';
import { selectUser } from '@/redux/slices/userSlice';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useSpendMutations } from '../hooks/use-spend-mutations';
import useFetchSpends from '../hooks/use-fetch-spends';

type Props = {
    closeForm: any;
    selectedSpend?: Spend;
};

const FormSchema = z.object({
    store: z.string({
        required_error: 'A store is required.',
    }),
    item: z.string({
        required_error: 'An item is required.',
    }),
    cost: z.number({
        required_error: 'A cost is required.',
    }),
    category: z.string({
        required_error: 'A category is required.',
    }),
    necessity: z.string({
        required_error: 'A necessity is required.',
    }),
    date: z.date({
        required_error: 'A date is required.',
    }),
});

const SpendForm = ({ closeForm, selectedSpend }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const dispatch = useAppDispatch();

    const { createSpendMutation, updateSpendMutation, deleteSpendMutation } = useSpendMutations();

    const addSpend = async (spend: Omit<Spend, 'id'>) => {
        createSpendMutation.mutate(spend);
        closeForm();
    };

    const editSpend = async (updatedSpend: Spend) => {
        updateSpendMutation(updatedSpend);
        closeForm();
    };

    const removeSpend = async (idToDelete: string) => {
        deleteSpendMutation(idToDelete);
        closeForm();
    };

    const handleDelete = () => {
        selectedSpend && removeSpend(selectedSpend.id);
    };

    const form = useForm({
        defaultValues: selectedSpend,
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log('data: ', data);
        if (user) {
            if (selectedSpend) {
                let spendToEdit: Spend = {
                    ...data,
                    user_email: user!.email,
                    id: selectedSpend.id,
                };

                editSpend(spendToEdit);
            } else {
                let spendToAdd: Spend = {
                    ...data,
                    user_email: user!.email,
                };

                addSpend(spendToAdd);
            }
        } else {
            console.error('[ERROR] Could not add spend. [REASON] No user.');
        }
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                    <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    };
    return (
        <Modal title={selectedSpend ? 'Edit Spending' : 'New Spending'} closeModal={closeForm} headerStyle={'text-black'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='store'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Store</FormLabel>
                                <Input placeholder='Store' />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='item'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Item</FormLabel>
                                <Input placeholder='Item' />

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='cost'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Cost</FormLabel>
                                <Input value={field.value} placeholder='Cost' />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='category'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Category</FormLabel>
                                <Select value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Category' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {spendingCategories.map((category) => (
                                            <SelectItem value={category}>{category}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='necessity'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Necessity</FormLabel>
                                <Select value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Necessity' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {necessityCategories.map((necessity) => (
                                            <SelectItem value={necessity}>{necessity}</SelectItem>
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
                                                {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
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
                    <div className={`flex pt-4 ${selectedSpend ? 'justify-between' : 'justify-end'}`}>
                        {selectedSpend && (
                            <Button onClick={handleDelete} variant='destructive' size='icon'>
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

export default SpendForm;
