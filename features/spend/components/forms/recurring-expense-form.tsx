import { SubmitHandler, useForm } from 'react-hook-form';
import { spendingCategories } from '@/constants';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useRecurringExpenseMutations } from '../../hooks/recurring-expense/use-recurring-expense-mutations';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type RecurringExpense = {
    id: string;
    name: string;
    description?: string;
    amount: number;
    period: 'weekly' | 'monthly' | 'yearly';
    category: string;
    next_billing_date: Date;
    created_at: string;
};

type Props = {
    closeForm: any;
    selectedRecurringExpense?: RecurringExpense;
};

const FormSchema = z.object({
    name: z.string({
        required_error: 'Name is required.',
    }),
    description: z.string().optional(),
    amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
    period: z.enum(['weekly', 'monthly', 'yearly'], {
        required_error: 'A period is required.',
    }),
    category: z.string({
        required_error: 'A category is required.',
    }),
    next_billing_date: z.date({
        required_error: 'Next billing date is required.',
    }),
});

const RecurringExpenseForm = ({ closeForm, selectedRecurringExpense }: Props) => {
    const { createRecurringExpenseMutation, updateRecurringExpenseMutation, deleteRecurringExpenseMutation } = useRecurringExpenseMutations();

    const form = useForm({
        defaultValues: selectedRecurringExpense,
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data) => {
        if (selectedRecurringExpense) {
            const updatedExpense: RecurringExpense = {
                ...data,
                id: selectedRecurringExpense.id,
                created_at: selectedRecurringExpense.created_at,
            };

            updateRecurringExpenseMutation.mutate(updatedExpense);
        } else {
            const newExpense: Omit<RecurringExpense, 'id' | 'created_at'> = {
                ...data,
            };

            createRecurringExpenseMutation.mutate(newExpense);
        }
        closeForm();
    };

    const handleDelete = () => {
        selectedRecurringExpense && deleteRecurringExpenseMutation.mutate(selectedRecurringExpense.id);
        closeForm();
    };

    return (
        <Modal title={selectedRecurringExpense ? 'Edit Recurring Expense' : 'New Recurring Expense'} closeModal={closeForm} headerStyle={'text-black'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                        name='description'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>Description (Optional)</FormLabel>
                                <Input {...field} placeholder='Description' />
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
                    <div className={`flex pt-4 ${selectedRecurringExpense ? 'justify-between' : 'justify-end'}`}>
                        {selectedRecurringExpense && (
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

export default RecurringExpenseForm;
