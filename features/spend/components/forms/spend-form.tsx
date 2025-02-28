import { SubmitHandler, useForm } from 'react-hook-form';
import { necessityCategories, spendingCategories } from '@/constants';
import { useAppSelector } from '@/store/hooks';
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

const FormSchema = z.discriminatedUnion('expenseType', [
    // One-time expense schema
    z.object({
        expenseType: z.literal('one-time'),
        item: z.string({ required_error: 'Item is required.' }),
        cost: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
        store: z.string({ required_error: 'Store is required.' }),
        category: z.string({ required_error: 'Category is required.' }),
        necessity: z.enum(['Need', 'Want', 'Waste'], {
            required_error: 'Necessity is required.',
        }),
        date: z.date({ required_error: 'Date is required.' }),
    }),
    // Recurring expense schema - matching original recurring expense form
    z.object({
        expenseType: z.literal('recurring'),
        name: z.string({ required_error: 'Name is required.' }),
        amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
        period: z.enum(['weekly', 'monthly', 'yearly'], {
            required_error: 'Period is required.',
        }),
        category: z.string({ required_error: 'Category is required.' }),
        next_billing_date: z.date({ required_error: 'Next billing date is required.' }),
    }),
]);

type FormValues = z.infer<typeof FormSchema>;

type Props = {
    closeForm: any;
    selectedSpend?: Spend;
    selectedRecurringExpense?: RecurringExpense;
};

const SpendForm = ({ closeForm, selectedSpend, selectedRecurringExpense }: Props) => {
    const [expenseType, setExpenseType] = useState<'one-time' | 'recurring'>(selectedRecurringExpense ? 'recurring' : 'one-time');

    const { createSpendMutation, updateSpendMutation, deleteSpendMutation } = useSpendMutations();
    const { createRecurringExpenseMutation, updateRecurringExpenseMutation, deleteRecurringExpenseMutation } = useRecurringExpenseMutations();

    const form = useForm<FormValues>({
        defaultValues: selectedRecurringExpense
            ? {
                  expenseType: 'recurring',
                  name: selectedRecurringExpense.name,
                  amount: selectedRecurringExpense.amount,
                  period: selectedRecurringExpense.period,
                  category: selectedRecurringExpense.category,
                  next_billing_date: new Date(selectedRecurringExpense.next_billing_date),
              }
            : selectedSpend
              ? {
                    expenseType: 'one-time',
                    item: selectedSpend.item,
                    cost: selectedSpend.cost,
                    store: selectedSpend.store,
                    category: selectedSpend.category,
                    necessity: selectedSpend.necessity,
                    date: new Date(selectedSpend.date),
                }
              : {
                    expenseType: 'one-time',
                },
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        if (data.expenseType === 'recurring') {
            // Transform the recurring expense data to match the API expectations
            const recurringExpenseData = {
                name: data.name,
                amount: data.amount,
                period: data.period,
                category: data.category,
                next_billing_date: data.next_billing_date,
            };

            if (selectedRecurringExpense) {
                updateRecurringExpenseMutation.mutate({
                    ...recurringExpenseData,
                    id: selectedRecurringExpense.id,
                    created_at: selectedRecurringExpense.created_at,
                });
            } else {
                createRecurringExpenseMutation.mutate(recurringExpenseData);
            }
        } else {
            // Transform the one-time expense data
            const spendData = {
                item: data.item,
                cost: data.cost,
                store: data.store,
                category: data.category,
                necessity: data.necessity,
                date: data.date,
                expenseType: 'one-time' as const,
            };

            if (selectedSpend) {
                updateSpendMutation.mutate({
                    ...spendData,
                    id: selectedSpend.id,
                });
            } else {
                createSpendMutation.mutate(spendData);
            }
        }
        closeForm();
    };

    const handleDelete = () => {
        if (selectedRecurringExpense) {
            deleteRecurringExpenseMutation.mutate(selectedRecurringExpense.id);
        } else if (selectedSpend) {
            deleteSpendMutation.mutate(selectedSpend.id);
        }
        closeForm();
    };

    return (
        <Modal title={selectedRecurringExpense ? 'Edit Recurring Expense' : selectedSpend ? 'Edit Expense' : 'New Expense'} closeModal={closeForm} headerStyle={'text-black'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    {!selectedSpend && !selectedRecurringExpense && (
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

                    {expenseType === 'one-time' ? (
                        // One-time expense fields
                        <>
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
                        </>
                    ) : (
                        // Recurring expense fields - matching original form
                        <>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>Name</FormLabel>
                                        <Input {...field} placeholder='Expense name' />
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
                                        <Input type='number' {...field} placeholder='Amount' onChange={(e) => field.onChange(e.target.valueAsNumber)} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                    <div className={`flex pt-4 ${selectedSpend || selectedRecurringExpense ? 'justify-between' : 'justify-end'}`}>
                        {(selectedSpend || selectedRecurringExpense) && (
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
