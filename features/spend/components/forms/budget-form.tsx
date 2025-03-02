import { SubmitHandler, useForm } from 'react-hook-form';
import { spendingCategories } from '@/constants';
import Modal from '@/components/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useMutateBudgets } from '../../hooks/supabase/use-budget';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';
import { useState } from 'react';
import SelectGroup from '@/components/ui/input-groups/select-group';
import InputGroup from '@/components/ui/input-groups/input-group';

type Props = {
    closeForm: () => void;
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
    const { create: createBudget, update: updateBudget, delete: deleteBudget } = useMutateBudgets();

    const form = useForm({
        defaultValues: selectedBudget,
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        if (selectedBudget) updateBudget({ ...data, id: selectedBudget.id });
        else createBudget(data);

        closeForm();
    };

    const handleDelete = () => {
        setShowDeleteAlert(true);
    };

    const handleConfirmDelete = () => {
        selectedBudget && deleteBudget(selectedBudget.id);
        closeForm();
    };

    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const deleteMessage = `This action cannot be undone. This will permanently delete the budget "${selectedBudget?.category}" and remove all associated data.`;

    return (
        <>
            <Modal title={selectedBudget ? 'Edit Budget' : 'New Budget'} closeModal={closeForm} headerStyle={'text-black'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <SelectGroup control={form.control} name='category' label='Category' placeholder='Select category' options={spendingCategories} />
                        <InputGroup control={form.control} name='amount' label='Amount' placeholder='Amount' type='number' step='0.01' />
                        <SelectGroup control={form.control} name='period' label='Period' placeholder='Select period' options={['monthly', 'yearly']} />

                        <FormActions onDelete={handleDelete} onCancel={closeForm} showDelete={!!selectedBudget} />
                    </form>
                </Form>
            </Modal>

            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} deleteMessage={deleteMessage} handleConfirmDelete={handleConfirmDelete} />
        </>
    );
};

export default BudgetForm;
