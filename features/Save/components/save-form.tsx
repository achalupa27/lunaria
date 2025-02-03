import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '@/redux/hooks';
import Modal from '@/components/ui/modal';
import DateInput from '@/components/ui/Inputs/DateInput';
import SelectInput from '@/components/ui/Inputs/SelectInput';
import { savingAccounts } from '@/constants';
import { selectUser } from '@/redux/slices/userSlice';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import AmountInput from '@/components/ui/Inputs/AmountInput';
import { useSaveMutations } from '../hooks/use-save-mutations';

type Props = {
    closeForm: any;
    selectedSave?: Save;
};

const SaveForm = ({ closeForm, selectedSave }: Props) => {
    const user = useAppSelector(selectUser);
    const { register, handleSubmit } = useForm({ defaultValues: selectedSave });
    const { createSaveMutation, updateSaveMutation, deleteSaveMutation } = useSaveMutations();

    const onSubmit: SubmitHandler<any> = (save: any) => {
        if (user) {
            if (selectedSave) {
                let saveToEdit: Save = {
                    ...save,
                    user_email: user!.email,
                    id: selectedSave.id,
                };

                editSave(saveToEdit);
            } else {
                let saveToAdd: Save = {
                    ...save,
                    user_email: user!.email,
                };

                addSave(saveToAdd);
            }
        } else {
            console.error('[ERROR] Could not add save. [REASON] No user.');
        }
    };

    const addSave = async (save: Omit<Save, 'id'>) => {
        createSaveMutation.mutate(save);
        closeForm();
    };

    const editSave = async (updatedSave: Save) => {
        updateSaveMutation.mutate(updatedSave);
        closeForm();
    };

    const handleDelete = () => {
        selectedSave && deleteSaveMutation.mutate(selectedSave.id);
        closeForm();
    };

    const [term, setTerm] = useState<'Deposit' | 'Withdrawal'>('Deposit');

    return (
        <Modal title={selectedSave ? 'Edit Saving' : 'New Saving'} closeModal={closeForm} headerStyle={'text-black'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='border-orange-0 relative flex w-full overflow-hidden rounded-full border bg-white dark:bg-black'>
                    <div className={`absolute left-0 top-0 h-full w-1/2 rounded-full transition-transform  duration-200 dark:bg-white ${term === 'Withdrawal' ? 'translate-x-full bg-red-600 ' : 'translate-x-0 bg-green-500 '}`}></div>

                    <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${term === 'Deposit' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setTerm('Deposit')}>
                        Deposit
                    </div>

                    <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${term === 'Withdrawal' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setTerm('Withdrawal')}>
                        Withdrawal
                    </div>
                </div>
                <SelectInput register={register} label={'Account'} registerValue={'account'} categories={savingAccounts} isRequired={true} />

                {/* <DateInputNew /> */}
                <AmountInput />
                {/* <div className='flex space-x-2'>
                    <NumberInput register={register} label={'Amount'} registerValue={'amount'} isRequired={true} />
                    <SelectInput register={register} label={'Currency'} registerValue={'currency'} categories={currencyCategories} isRequired={true} />
                </div> */}
                <DateInput register={register} label={'Date'} registerValue={'date'} isRequired={true} today={true} />

                <div className={`flex pt-4 ${selectedSave ? 'justify-between' : 'justify-end'}`}>
                    {selectedSave && (
                        <Button onClick={handleDelete} variant='destructive' size='icon'>
                            <Trash />
                        </Button>
                    )}
                    <div className='flex space-x-3'>
                        <Button variant='secondary' onClick={closeForm}>
                            Cancel
                        </Button>
                        <Button onClick={closeForm}>Save</Button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default SaveForm;
