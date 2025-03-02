import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@/components/ui/modal';
import { savingAccounts } from '@/constants';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useMutateSaves } from '../../hooks/supabase/use-saves';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';
import InputGroup from '@/components/ui/input-groups/input-group';
import DateGroup from '@/components/ui/input-groups/date-group';
import SelectGroup from '@/components/ui/input-groups/select-group';
import { createSchemaFromType } from '@/utils/zod';

type Props = {
    closeForm: () => void;
    selectedSave?: Save;
};

const FormSchema = createSchemaFromType<SaveCreate>({
    type: z.enum(['Deposit', 'Withdrawal'], {
        required_error: 'A type is required.',
    }),
    account: z.string({
        required_error: 'An account is required.',
    }),
    amount: z.coerce.number({
        required_error: 'An amount is required.',
    }),
    date: z.date({
        required_error: 'A date is required.',
    }),
});

type FormValues = z.infer<typeof FormSchema>;

const SaveForm = ({ closeForm, selectedSave }: Props) => {
    const { create: createSave, update: updateSave, delete: deleteSave } = useMutateSaves();

    const form = useForm({
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
    const deleteMessage = `This action cannot be undone. This will permanently delete the saving "${selectedSave?.amount}" and remove all associated data.`;

    return (
        <>
            <Modal title={selectedSave ? 'Edit Saving' : 'New Saving'} closeModal={closeForm} headerStyle={'text-black'}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <div className='border-orange-0 relative flex w-full overflow-hidden rounded-lg  bg-white dark:bg-black'>
                            <div className={`absolute left-0 top-0 h-full w-1/2 rounded-lg transition-transform duration-200 dark:bg-white ${type === 'Withdrawal' ? 'translate-x-full bg-red-600' : 'translate-x-0 bg-green-500 '}`}></div>

                            <div
                                className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${type === 'Deposit' ? 'text-white dark:text-black' : 'text-zinc-500'}`}
                                onClick={() => {
                                    setType('Deposit');
                                    form.setValue('type', 'Deposit');
                                }}>
                                Deposit
                            </div>

                            <div
                                className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${type === 'Withdrawal' ? 'text-white dark:text-black' : 'text-zinc-500'}`}
                                onClick={() => {
                                    setType('Withdrawal');
                                    form.setValue('type', 'Withdrawal');
                                }}>
                                Withdrawal
                            </div>
                        </div>
                        <InputGroup control={form.control} name='amount' label='Amount' placeholder='Amount' type='number' step='0.01' />
                        <SelectGroup control={form.control} name='account' label='Account' placeholder='Account' options={savingAccounts} />
                        <DateGroup control={form.control} name='date' label='Date' />

                        <FormActions onDelete={handleDelete} onCancel={closeForm} showDelete={!!selectedSave} />
                    </form>
                </Form>
            </Modal>

            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} deleteMessage={deleteMessage} handleConfirmDelete={handleConfirmDelete} />
        </>
    );
};

export default SaveForm;
