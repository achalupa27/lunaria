import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/components/ui/modal';
import { incomeSources } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutateMakes } from '../../hooks/supabase/use-makes';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';
import { useState } from 'react';
import InputGroup from '@/components/ui/input-groups/input-group';
import SelectGroup from '@/components/ui/input-groups/select-group';
import DateGroup from '@/components/ui/input-groups/date-group';
import { Form } from '@/components/ui/form';

type Props = {
    closeForm: () => void;
    selectedMake?: Make;
};

const FormSchema = z.object({
    amount: z.coerce
        .number({
            required_error: 'An amount is required.',
            invalid_type_error: 'Amount must be a number',
        })
        .min(0.01, 'Amount must be greater than 0'),
    source: z.string({
        required_error: 'An income source is required.',
    }),
    date: z.date({
        required_error: 'A date is required.',
    }),
});

const MakeForm = ({ closeForm, selectedMake }: Props) => {
    const form = useForm({
        defaultValues: {
            ...selectedMake,
            date: selectedMake?.date ? new Date(selectedMake.date) : undefined,
        },
        resolver: zodResolver(FormSchema),
    });

    const { create: createMake, update: updateMake, delete: deleteMake } = useMutateMakes();

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        if (selectedMake) updateMake({ ...data, id: selectedMake.id });
        else createMake(data);

        closeForm();
    };

    const handleDelete = () => {
        setShowDeleteAlert(true);
    };

    const handleConfirmDelete = () => {
        selectedMake && deleteMake(selectedMake.id);
        closeForm();
    };

    const deleteMessage = `This action cannot be undone. This will permanently delete the making "${selectedMake?.amount}" and remove all associated data.`;
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    return (
        <>
            <Modal title={selectedMake ? 'Edit Making' : 'New Making'} closeModal={closeForm} headerStyle={'text-black'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <InputGroup control={form.control} name='amount' label='Amount' placeholder='Amount' type='number' step='0.01' />
                        <SelectGroup control={form.control} name='source' label='Source' placeholder='Source' options={incomeSources} />
                        <DateGroup control={form.control} name='date' label='Date' />

                        <FormActions onDelete={handleDelete} onCancel={closeForm} showDelete={!!selectedMake} />
                    </form>
                </Form>
            </Modal>

            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} deleteMessage={deleteMessage} handleConfirmDelete={handleConfirmDelete} />
        </>
    );
};

export default MakeForm;
