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
import { useEffect } from 'react';
import { updateSave } from '@/features/save/services/updateSave';

type Props = {
    isOpen: boolean;
    closeForm: any;
    selectedSave?: Save;
};

const SaveForm = ({ isOpen, closeForm, selectedSave }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const saves = useAppSelector(selectSaving);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (selectedSave) {
            setValue('date', selectedSave.date);
            setValue('type', selectedSave.type);
            setValue('amount', selectedSave.amount);
            setValue('account', selectedSave.account);
        } else {
            setValue('date', undefined);
            setValue('type', undefined);
            setValue('amount', undefined);
            setValue('account', undefined);
        }
    }, [selectedSave, setValue]);

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

    if (isOpen) {
        return (
            <Modal title={selectedSave ? 'Edit Saving' : 'New Saving'} closeModal={closeForm} headerStyle={'text-l-blue'}>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                    <DateInput register={register} label={'Date'} registerValue={'date'} isRequired={true} today={true} />
                    <SelectInput register={register} label={'Type'} registerValue={'type'} categories={saveTypes} isRequired={true} />
                    <NumberInput register={register} label={'Amount'} registerValue={'amount'} isRequired={true} />
                    <SelectInput register={register} label={'Currency'} registerValue={'currency'} categories={currencyCategories} isRequired={true} />
                    <SelectInput register={register} label={'Account'} registerValue={'account'} categories={savingAccounts} isRequired={true} />
                    <div className='flex justify-between pt-4'>
                        {selectedSave && <DeleteButton onClick={handleDelete} />}
                        <div className='flex space-x-3'>
                            <CancelButton onClick={closeForm} />
                            <SaveButton styling={'bg-l-blue hover:bg-ld-blue'} />
                        </div>
                    </div>
                </form>
            </Modal>
        );
    }
    return null;
};

export default SaveForm;
