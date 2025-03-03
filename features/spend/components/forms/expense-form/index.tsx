import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/components/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import ExpenseTypeToggle from './expense-type-toggle';
import { useState } from 'react';
import { useMutateRecurringExpenses } from '../../../hooks/supabase/use-recurring-expenses';
import { useMutateSpends } from '../../../hooks/supabase/use-spends';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';
import { RecurringExpenseSchema, OneTimeExpenseSchema } from './schema';
import RecurringExpenseFields from './recurring-expense-fields';
import OneTimeExpenseFields from './one-time-expense-fields';

type OneTimeExpenseFormValues = z.infer<typeof OneTimeExpenseSchema>;
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

    const oneTimeForm = useForm<OneTimeExpenseFormValues>({
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

    const recurringForm = useForm<RecurringExpenseFormValues>({
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

    const handleOneTimeSubmit: SubmitHandler<OneTimeExpenseFormValues> = (data: OneTimeExpenseFormValues) => {
        if (selectedSpend) {
            updateSpend({ ...data, id: selectedSpend.id });
        } else {
            createSpend(data);
        }
        closeForm();
    };

    const handleRecurringSubmit: SubmitHandler<RecurringExpenseFormValues> = (data: RecurringExpenseFormValues) => {
        if (selectedRecurringExpense) {
            updateRecurringExpense({ ...data, id: selectedRecurringExpense.id });
        } else {
            createRecurringExpense(data);
        }
        closeForm();
    };

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

    const handleDelete = () => {
        setShowDeleteAlert(true);
    };

    const handleConfirmDelete = () => {
        if (selectedRecurringExpense) deleteRecurringExpense(selectedRecurringExpense.id);
        else if (selectedSpend) deleteSpend(selectedSpend.id);
        closeForm();
    };

    return (
        <Modal title={selectedRecurringExpense ? 'Edit Recurring Expense' : selectedSpend ? 'Edit Expense' : 'New Expense'} closeModal={closeForm}>
            <ExpenseTypeToggle type={expenseType} onChange={switchExpenseType} />

            {expenseType === 'one-time' ? (
                <Form {...oneTimeForm}>
                    <form onSubmit={oneTimeForm.handleSubmit(handleOneTimeSubmit)} className='space-y-4'>
                        <OneTimeExpenseFields control={oneTimeForm.control} />
                        <FormActions onDelete={selectedSpend ? handleDelete : undefined} onCancel={closeForm} showDelete={!!selectedSpend} />
                    </form>
                </Form>
            ) : (
                <Form {...recurringForm}>
                    <form onSubmit={recurringForm.handleSubmit(handleRecurringSubmit)} className='space-y-4'>
                        <RecurringExpenseFields control={recurringForm.control} />
                        <FormActions onDelete={selectedRecurringExpense ? handleDelete : undefined} onCancel={closeForm} showDelete={!!selectedRecurringExpense} />
                    </form>
                </Form>
            )}
            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} handleConfirmDelete={handleConfirmDelete} itemCategory={expenseType === 'recurring' ? 'recurring expense' : 'one-time expense'} itemName={expenseType === 'recurring' ? selectedRecurringExpense?.name : selectedSpend?.item} />
        </Modal>
    );
};

export default SpendForm;
