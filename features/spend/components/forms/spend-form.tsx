import { SubmitHandler, useForm } from 'react-hook-form';
import { necessityCategories, spendingCategories } from '@/constants';
import { useAppSelector } from '@/redux/hooks';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

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
import { useSpendMutations } from '../../hooks/transaction/use-spend-mutations';
import ExpenseTypeToggle from '../ui/expense-type-toggle';
import { useRecurringExpenseMutations } from '../../hooks/recurring-expense/use-recurring-expense-mutations';
import { useState } from 'react';

type Props = {
    closeForm: any;
    selectedSpend?: Spend;
};

const FormSchema = z.object({
    expenseType: z.enum(['one-time', 'recurring']),
    description: z.string().optional(),
    cost: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
    necessity: z.enum(['Need', 'Want', 'Waste'], {
        required_error: 'A necessity level is required.',
    }),
    category: z.string({
        required_error: 'A category is required.',
    }),
    date: z.date({
        required_error: 'A date is required.',
    }),
    // Recurring expense fields
    period: z.enum(['weekly', 'monthly', 'yearly']).optional(),
    next_billing_date: z.date().optional(),
});

const SpendForm = ({ closeForm, selectedSpend }: Props) => {
    const [expenseType, setExpenseType] = useState<'one-time' | 'recurring'>('one-time');
    const { createSpendMutation, updateSpendMutation, deleteSpendMutation } = useSpendMutations();
    const { createRecurringExpenseMutation } = useRecurringExpenseMutations();

    const form = useForm({
        defaultValues: {
            ...selectedSpend,
            expenseType: 'one-time',
        },
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data) => {
        if (expenseType === 'one-time') {
            // Handle one-time expense
            if (selectedSpend) {
                const updatedSpend: Spend = {
                    ...data,
                    id: selectedSpend.id,
                };
                updateSpendMutation.mutate(updatedSpend);
            } else {
                const newSpend: Omit<Spend, 'id'> = {
                    ...data,
                };
                createSpendMutation.mutate(newSpend);
            }
        } else {
            // Handle recurring expense
            const recurringExpense: Omit<RecurringExpense, 'id' | 'created_at'> = {
                name: data.description || '',
                description: data.description,
                amount: data.cost,
                period: data.period!,
                category: data.category,
                next_billing_date: data.next_billing_date!,
            };
            createRecurringExpenseMutation.mutate(recurringExpense);
        }
        closeForm();
    };

    const handleDelete = () => {
        selectedSpend && deleteSpendMutation.mutate(selectedSpend.id);
        closeForm();
    };

    return (
        <Modal title={selectedSpend ? 'Edit Expense' : 'New Expense'} closeModal={closeForm} headerStyle={'text-black'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    {!selectedSpend && (
                        <FormField
                            control={form.control}
                            name='expenseType'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <ExpenseTypeToggle
                                        type={expenseType}
                                        onChange={(type) => {
                                            setExpenseType(type);
                                            field.onChange(type);
                                        }}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name='item'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Item</FormLabel>
                                <Input {...field} placeholder='Item' />
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
                                <Input type='number' {...field} placeholder='Cost' onChange={(e) => field.onChange(e.target.valueAsNumber)} />
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
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Category' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {spendingCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
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
                        name='necessity'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Necessity</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Necessity' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {necessityCategories.map((necessity) => (
                                            <SelectItem key={necessity} value={necessity}>
                                                {necessity}
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
                        name='store'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Store</FormLabel>
                                <Input {...field} placeholder='Store' />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='date'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Purchase Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={'outline'} className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                {field.value ? format(field.value, 'PPP') : <span>Purchase date</span>}
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
                    {expenseType === 'recurring' && (
                        <>
                            <FormField
                                control={form.control}
                                name='period'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>Billing Period</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select period' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='weekly'>Weekly</SelectItem>
                                                <SelectItem value='monthly'>Monthly</SelectItem>
                                                <SelectItem value='yearly'>Yearly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='next_billing_date'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>Next Billing Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={'outline'} className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                        {field.value ? format(field.value, 'PPP') : <span>Next billing date</span>}
                                                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-auto p-0' align='start'>
                                                <Calendar mode='single' selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    <div className={`flex pt-4 ${selectedSpend ? 'justify-between' : 'justify-end'}`}>
                        {selectedSpend && (
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

export default SpendForm;
