import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/components/ui/modal';
import { savingAccounts } from '@/constants';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useMutateSaves } from '../../../hooks/supabase/use-saves';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';
import InputGroup from '@/components/ui/input-groups/input-group';
import DateGroup from '@/components/ui/input-groups/date-group';
import SelectGroup from '@/components/ui/input-groups/select-group';
import SaveTypeToggle from './save-type-toggle';
import { FormSchema } from './save-schema';

type Props = {
    closeForm: () => void;
    selectedSave?: Save;
};

type FormValues = z.infer<typeof FormSchema>;

const SaveForm = ({ closeForm, selectedSave }: Props) => {
    const { create: createSave, update: updateSave, delete: deleteSave } = useMutateSaves();

    const form = useForm<FormValues>({
        defaultValues: {
            ...selectedSave,
            date: selectedSave?.date ? new Date(selectedSave.date) : undefined,
            type: selectedSave?.type || 'Deposit',
        },
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        if (selectedSave) updateSave({ ...data, id: selectedSave.id });
        else createSave(data);

        closeForm();
    };

    const handleDelete = () => {
        setShowDeleteAlert(true);
    };

    const handleConfirmDelete = () => {
        selectedSave && deleteSave(selectedSave.id);
        closeForm();
    };

    const [type, setType] = useState<Save['type']>(selectedSave?.type || 'Deposit');
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    return (
        <Modal title={selectedSave ? 'Edit Saving' : 'New Saving'} closeModal={closeForm}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                    <SaveTypeToggle type={type} setType={setType} setValue={form.setValue} />
                    <InputGroup control={form.control} name='amount' label='Amount' placeholder='Amount' type='number' step='0.01' />
                    <SelectGroup control={form.control} name='account' label='Account' placeholder='Account' options={savingAccounts} />
                    <DateGroup control={form.control} name='date' label='Date' />

                    <FormActions onDelete={handleDelete} onCancel={closeForm} showDelete={!!selectedSave} />
                </form>
            </Form>
            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} handleConfirmDelete={handleConfirmDelete} itemCategory='Saving' itemName={selectedSave?.amount.toString() || ''} />
        </Modal>
    );
};

export default SaveForm;
