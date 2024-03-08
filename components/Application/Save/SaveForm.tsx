import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSaving, selectSaving, setSaving } from '@/redux/slices/saveSlice';
import Modal from '@/components/UI/Modals/Modal';
import DateInput from '@/components/UI/Inputs/DateInput';
import SelectInput from '@/components/UI/Inputs/SelectInput';
import { saveTypes, savingAccounts } from '@/data/constants';
import DeleteButton from '@/components/UI/Buttons/DeleteButton';
import CancelButton from '@/components/UI/Buttons/CancelButton';
import SaveButton from '@/components/UI/Buttons/SaveButton';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { selectUser } from '@/redux/slices/userSlice';
import { createSave } from '@/api/save/createSave';
import { deleteSave } from '@/api/save/deleteSave';
import NumberInput from '@/components/UI/Inputs/NumberInput';
import { useEffect } from 'react';

type Props = {
    isOpen: boolean;
    closeForm: any;
    saveToEdit?: Save;
};

const SaveForm = ({ isOpen, closeForm, saveToEdit }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const saves = useAppSelector(selectSaving);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (saveToEdit) {
            setValue('date', saveToEdit.date);
            setValue('type', saveToEdit.type);
            setValue('amount', saveToEdit.amount);
            setValue('account', saveToEdit.account);
        }
    }, [saveToEdit, setValue]);

    const onSubmit: SubmitHandler<any> = (save: any) => {
        if (saveToEdit) editSave(save);
        else addSave(save);
        closeForm();
    };

    const addSave = async (save: Save) => {
        if (user) {
            let saveToAdd = {
                ...save,
                user_email: user?.email,
            };

            // Add to database
            let createdSave = await createSave(saveToAdd, supabaseClient);

            // Update state
            dispatch(addSaving(createdSave));
        } else {
            console.error('[ERROR] Could not add save. [REASON] No user.');
        }
    };

    const removeSave = async (idToDelete: string) => {
        // Delete spend from database
        deleteSave(idToDelete, supabaseClient);

        // Delete from store
        const newSaves = saves.filter((save) => save.id !== idToDelete);
        dispatch(setSaving(newSaves));

        closeForm();
    };

    const editSave = async (updatedSave: Save) => {};

    const handleDelete = () => {
        saveToEdit && removeSave(saveToEdit.id);
    };

    if (isOpen) {
        return (
            <Modal title={saveToEdit ? 'Edit Saving' : 'New Saving'} closeModal={closeForm} headerStyle={'text-l-blue'}>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                    <DateInput register={register} label={'Date'} registerValue={'date'} isRequired={true} today={true} />
                    <SelectInput register={register} label={'Type'} registerValue={'type'} categories={saveTypes} isRequired={true} />
                    <NumberInput register={register} label={'Amount'} registerValue={'amount'} isRequired={true} />
                    <SelectInput register={register} label={'Account'} registerValue={'account'} categories={savingAccounts} isRequired={true} />
                    <div className='flex justify-between pt-4'>
                        {saveToEdit && <DeleteButton onClick={handleDelete} />}
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
