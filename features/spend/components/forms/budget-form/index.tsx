import { SubmitHandler, useForm } from 'react-hook-form';
import { spendingCategories } from '@/constants';
import Modal from '@/components/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useMutateBudgets } from '../../../hooks/supabase/use-budget';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';
import { useState } from 'react';
import SelectGroup from '@/components/ui/input-groups/select-group';
import InputGroup from '@/components/ui/input-groups/input-group';
import { FormSchema } from './schema';

type Props = {
    closeForm: () => void;
    selectedBudget?: Budget;
};

type FormValues = z.infer<typeof FormSchema>;

const BudgetForm = ({ closeForm, selectedBudget }: Props) => {
    const { create: createBudget, update: updateBudget, delete: deleteBudget } = useMutateBudgets();

    const form = useForm<FormValues>({
        defaultValues: selectedBudget,
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
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

    return (
        <Modal title={selectedBudget ? 'Edit Budget' : 'New Budget'} closeModal={closeForm} headerStyle={'text-black'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <SelectGroup control={form.control} name='category' label='Category' placeholder='Select category' options={spendingCategories} />
                    <InputGroup control={form.control} name='amount' label='Amount' placeholder='Amount' type='number' step='0.01' />
                    <SelectGroup control={form.control} name='period' label='Period' placeholder='Select period' options={['monthly', 'yearly']} />

                    <FormActions onDelete={handleDelete} onCancel={closeForm} showDelete={!!selectedBudget} />
                </form>
            </Form>
            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} handleConfirmDelete={handleConfirmDelete} itemCategory='budget' itemName={selectedBudget!.category} />
        </Modal>
    );
};

export default BudgetForm;
