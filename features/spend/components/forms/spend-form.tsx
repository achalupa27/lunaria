import { SubmitHandler, useForm } from 'react-hook-form';
import { necessityCategories, spendingCategories } from '@/constants';
import Modal from '@/components/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import ExpenseTypeToggle from '../ui/expense-type-toggle';
import { useState } from 'react';
import { useMutateRecurringExpenses } from '../../hooks/supabase/use-recurring-expenses';
import { useMutateSpends } from '../../hooks/supabase/use-spends';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';
import InputGroup from '@/components/ui/input-groups/input-group';
import SelectGroup from '@/components/ui/input-groups/select-group';
import DateGroup from '@/components/ui/input-groups/date-group';
import { createSchemaFromType } from '@/utils/zod';

const OneTimeExpenseSchema = createSchemaFromType<SpendCreate>({
    item: z.string({ required_error: 'Item is required.' }),
    cost: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
    store: z.string({ required_error: 'Store is required.' }),
    category: z.string({ required_error: 'Category is required.' }),
    necessity: z.enum(['Need', 'Want', 'Waste'], {
        required_error: 'Necessity is required.',
    }),
    date: z.date({ required_error: 'Date is required.' }),
});

type OneTimeExpenseFormValues = z.infer<typeof OneTimeExpenseSchema>;

const RecurringExpenseSchema = createSchemaFromType<RecurringExpenseCreate>({
    name: z.string({ required_error: 'Name is required.' }),
    amount: z.coerce.number().min(0.01, 'Amount must be greater than 0'),
    period: z.enum(['weekly', 'monthly', 'yearly'], {
        required_error: 'Period is required.',
    }),
    category: z.string({ required_error: 'Category is required.' }),
    next_billing_date: z.date({ required_error: 'Next billing date is required.' }),
});

type RecurringExpenseFormValues = z.infer<typeof RecurringExpenseSchema>;

type Props = {
    closeForm: () => void;
    selectedSpend?: Spend;
    selectedRecurringExpense?: RecurringExpense;
};

const SpendForm = ({ closeForm, selectedSpend, selectedRecurringExpense }: Props) => {
    const initialExpenseType = selectedRecurringExpense ? 'recurring' : 'one-time';
    const [expenseType, setExpenseType] = useState<'one-time' | 'recurring'>(initialExpenseType);

    const { create: createSpend, update: updateSpend, delete: deleteSpend } = useMutateSpends();
    const { create: createRecurringExpense, update: updateRecurringExpense, delete: deleteRecurringExpense } = useMutateRecurringExpenses();

    // One-time expense form
    const oneTimeForm = useForm({
        defaultValues: selectedSpend
            ? {
                  item: selectedSpend.item,
                  cost: selectedSpend.cost,
                  store: selectedSpend.store,
                  category: selectedSpend.category,
                  necessity: selectedSpend.necessity,
                  date: new Date(selectedSpend.date),
              }
            : {
                  item: '',
                  cost: 0,
                  store: '',
                  category: '',
                  necessity: 'Need' as const,
                  date: new Date(),
              },
        resolver: zodResolver(OneTimeExpenseSchema),
    });

    // Recurring expense form
    const recurringForm = useForm({
        defaultValues: selectedRecurringExpense
            ? {
                  name: selectedRecurringExpense.name,
                  amount: selectedRecurringExpense.amount,
                  period: selectedRecurringExpense.period,
                  category: selectedRecurringExpense.category,
                  next_billing_date: new Date(selectedRecurringExpense.next_billing_date),
              }
            : {
                  name: '',
                  amount: 0,
                  period: 'monthly' as const,
                  category: '',
                  next_billing_date: new Date(),
              },
        resolver: zodResolver(RecurringExpenseSchema),
    });

    // Handle one-time expense submit
    const handleOneTimeSubmit: SubmitHandler<OneTimeExpenseFormValues> = (data: OneTimeExpenseFormValues) => {
        if (selectedSpend) {
            updateSpend({ ...data, id: selectedSpend.id });
        } else {
            createSpend(data);
        }
        closeForm();
    };

    // Handle recurring expense submit
    const handleRecurringSubmit: SubmitHandler<RecurringExpenseFormValues> = (data: RecurringExpenseFormValues) => {
        if (selectedRecurringExpense) {
            updateRecurringExpense({ ...data, id: selectedRecurringExpense.id });
        } else {
            createRecurringExpense(data);
        }
        closeForm();
    };

    // Switch expense type
    const switchExpenseType = (type: 'one-time' | 'recurring') => {
        setExpenseType(type);
        if (!selectedSpend && !selectedRecurringExpense) {
            if (type === 'one-time') {
                oneTimeForm.reset({
                    item: '',
                    cost: 0,
                    store: '',
                    category: '',
                    necessity: 'Need',
                    date: new Date(),
                });
            } else {
                recurringForm.reset({
                    name: '',
                    amount: 0,
                    period: 'monthly',
                    category: '',
                    next_billing_date: new Date(),
                });
            }
        }
    };

    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const deleteMessage = `This action cannot be undone. This will permanently delete the ${expenseType === 'recurring' ? 'recurring expense' : 'one-time expense'} "${selectedRecurringExpense?.name || selectedSpend?.item}" and remove all associated data.`;

    const handleDelete = () => {
        setShowDeleteAlert(true);
    };

    const handleConfirmDelete = () => {
        if (selectedRecurringExpense) deleteRecurringExpense(selectedRecurringExpense.id);
        else if (selectedSpend) deleteSpend(selectedSpend.id);
        closeForm();
    };

    return (
        <>
            <Modal title={selectedRecurringExpense ? 'Edit Recurring Expense' : selectedSpend ? 'Edit Expense' : 'New Expense'} closeModal={closeForm} headerStyle={'text-black'}>
                <ExpenseTypeToggle type={expenseType} onChange={switchExpenseType} />

                {expenseType === 'one-time' ? (
                    <Form {...oneTimeForm}>
                        <form onSubmit={oneTimeForm.handleSubmit(handleOneTimeSubmit)} className='space-y-4'>
                            <InputGroup control={oneTimeForm.control} name='item' label='Item' placeholder='Item' />
                            <InputGroup control={oneTimeForm.control} name='cost' label='Cost' placeholder='Cost' type='number' step='0.01' />
                            <SelectGroup control={oneTimeForm.control} name='category' label='Category' placeholder='Select category' options={spendingCategories} />
                            <SelectGroup control={oneTimeForm.control} name='necessity' label='Necessity' placeholder='Select necessity' options={necessityCategories} />
                            <InputGroup control={oneTimeForm.control} name='store' label='Store' placeholder='Store' />
                            <DateGroup control={oneTimeForm.control} name='date' label='Purchase Date' />

                            <FormActions onDelete={selectedSpend ? handleDelete : undefined} onCancel={closeForm} showDelete={!!selectedSpend} />
                        </form>
                    </Form>
                ) : (
                    <Form {...recurringForm}>
                        <form onSubmit={recurringForm.handleSubmit(handleRecurringSubmit)} className='space-y-4'>
                            <InputGroup control={recurringForm.control} name='name' label='Name' placeholder='Expense name' />
                            <InputGroup control={recurringForm.control} name='amount' label='Amount' placeholder='Amount' type='number' step='0.01' />
                            <SelectGroup control={recurringForm.control} name='period' label='Billing Period' placeholder='Select period' options={['weekly', 'monthly', 'yearly']} />
                            <SelectGroup control={recurringForm.control} name='category' label='Category' placeholder='Select category' options={spendingCategories} />
                            <DateGroup control={recurringForm.control} name='next_billing_date' label='Next Billing Date' />

                            <FormActions onDelete={selectedRecurringExpense ? handleDelete : undefined} onCancel={closeForm} showDelete={!!selectedRecurringExpense} />
                        </form>
                    </Form>
                )}
            </Modal>

            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} deleteMessage={deleteMessage} handleConfirmDelete={handleConfirmDelete} />
        </>
    );
};

export default SpendForm;
