import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSaving, selectSaving, setSaving, updateSavingState } from '@/redux/slices/saveSlice';
import Modal from '@/components/ui/modal';
import DateInput from '@/components/ui/Inputs/DateInput';
import SelectInput from '@/components/ui/Inputs/SelectInput';
import { currencyCategories, saveTypes, savingAccounts } from '@/constants';
import DeleteButton from '@/components/ui/buttons/DeleteButton';
import CancelButton from '@/components/ui/buttons/CancelButton';
import SaveButton from '@/components/ui/buttons/SaveButton';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { selectUser } from '@/redux/slices/userSlice';
import { createSave } from '@/features/save/services/createSave';
import { deleteSave } from '@/features/save/services/deleteSave';
import NumberInput from '@/components/ui/Inputs/NumberInput';
import { useEffect, useState } from 'react';
import { updateSave } from '@/features/save/services/updateSave';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import AmountInput from '@/components/ui/Inputs/AmountInput';
import DateInputNew from '@/components/ui/Inputs/DateInputNew';

type Props = {
    closeForm: any;
    selectedSave?: Save;
};

const SaveForm = ({ closeForm, selectedSave }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const saves = useAppSelector(selectSaving);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm({ defaultValues: selectedSave });

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

    const addSave = async (save: Save) => {
        // Add to database
        let createdSave = await createSave(save, supabaseClient);

        // Add to state
        dispatch(addSaving(createdSave));

        closeForm();
    };

    const editSave = async (updatedSave: Save) => {
        // Update database
        updateSave(updatedSave, supabaseClient);

        // Update state
        updateSavingState(updatedSave);

        closeForm();
    };

    const removeSave = async (idToDelete: string) => {
        // Delete spend from database
        deleteSave(idToDelete, supabaseClient);

        // Delete from store
        const newSaves = saves.filter((save) => save.id !== idToDelete);
        dispatch(setSaving(newSaves));

        closeForm();
    };

    const handleDelete = () => {
        selectedSave && removeSave(selectedSave.id);
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
