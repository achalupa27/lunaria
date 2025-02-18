import { SubmitHandler, useForm } from 'react-hook-form';
import { spendingCategories } from '@/constants';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useBudgetMutations } from '../../hooks/budget/use-budget-mutations';

type Props = {
    closeForm: any;
    selectedBudget?: Budget;
};

const FormSchema = z.object({
    category: z.string({
        required_error: 'A category is required.',
    }),
    amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
    period: z.enum(['monthly', 'yearly'], {
        required_error: 'A period is required.',
    }),
});

const BudgetForm = ({ closeForm, selectedBudget }: Props) => {
    const { createBudgetMutation, updateBudgetMutation, deleteBudgetMutation } = useBudgetMutations();

    const form = useForm({
        defaultValues: selectedBudget,
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        if (selectedBudget) {
            const updatedBudget: Budget = {
                ...data,
                id: selectedBudget.id,
                user_id: selectedBudget.user_id,
                created_at: selectedBudget.created_at,
            };

            updateBudgetMutation.mutate(updatedBudget);
        } else {
            const newBudget: Omit<Budget, 'id' | 'created_at'> = {
                ...data,
                user_id: '', // This will be set by the service
            };

            createBudgetMutation.mutate(newBudget);
        }
        closeForm();
    };

    const handleDelete = () => {
        selectedBudget && deleteBudgetMutation.mutate(selectedBudget.id);
        closeForm();
    };

    return (
        <Modal title={selectedBudget ? 'Edit Budget' : 'New Budget'} closeModal={closeForm} headerStyle={'text-black'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                                <FormLabel>Period</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Period' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='monthly'>Monthly</SelectItem>
                                        <SelectItem value='yearly'>Yearly</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className={`flex pt-4 ${selectedBudget ? 'justify-between' : 'justify-end'}`}>
                        {selectedBudget && (
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

export default BudgetForm;
