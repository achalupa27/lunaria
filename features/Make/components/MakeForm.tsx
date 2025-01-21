import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addMaking, selectMaking, setMaking, updateMakingState } from '@/redux/slices/makeSlice';
import Modal from '@/components/ui/Modals/Modal';
import { selectUser } from '@/redux/slices/userSlice';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import DateInput from '@/components/ui/Inputs/DateInput';
import NumberInput from '@/components/ui/Inputs/NumberInput';
import SelectInput from '@/components/ui/Inputs/SelectInput';
import { currencyCategories, incomeSources } from '@/data/constants';
import DeleteButton from '@/components/ui/Buttons/DeleteButton';
import CancelButton from '@/components/ui/Buttons/CancelButton';
import SaveButton from '@/components/ui/Buttons/SaveButton';
import { useEffect } from 'react';
import { createMake } from '@/features/Make/services/createMake';
import { updateMake } from '@/features/Make/services/updateMake';
import { deleteMake } from '@/features/Make/services/deleteMake';

type Props = {
    isOpen: boolean;
    closeForm: any;
    selectedMake?: Make;
};

const MakeForm = ({ isOpen, closeForm, selectedMake }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const makes = useAppSelector(selectMaking);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (selectedMake) {
            setValue('date', selectedMake.date);
            setValue('amount', selectedMake.amount);
            setValue('source', selectedMake.source);
        } else {
            setValue('date', undefined);
            setValue('amount', undefined);
            setValue('source', undefined);
        }
    }, [selectedMake, setValue]);

    const onSubmit: SubmitHandler<any> = (make: any) => {
        if (user) {
            if (selectedMake) {
                let makeToEdit: Make = {
                    ...make,
                    user_email: user!.email,
                    id: selectedMake.id,
                };

                editMake(makeToEdit);
            } else {
                let makeToAdd: Make = {
                    ...make,
                    user_email: user!.email,
                };

                addMake(makeToAdd);
            }
        } else {
            console.error('[ERROR] Could not add make. [REASON] No user.');
        }
        closeForm();
    };

    const addMake = async (make: Make) => {
        // Add to database
        let createdMake = await createMake(make, supabaseClient);

        // Add to state
        dispatch(addMaking(createdMake));

        closeForm();
    };

    const editMake = async (updatedMake: Make) => {
        // Update database
        updateMake(updatedMake, supabaseClient);

        // Update state
        updateMakingState(updatedMake);

        closeForm();
    };

    const removeMake = async (idToDelete: string) => {
        // Delete from database
        deleteMake(idToDelete, supabaseClient);

        // Delete from state
        const newMakes = makes.filter((make) => make.id !== idToDelete);
        dispatch(setMaking(newMakes));

        closeForm();
    };

    const handleDelete = () => {
        selectedMake && removeMake(selectedMake.id);
    };

    if (!isOpen) return null;

    return (
        <Modal title={selectedMake ? 'Edit Making' : 'New Making'} closeModal={closeForm} headerStyle={'text-l-green'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                <DateInput register={register} label={'Date'} registerValue={'date'} isRequired={true} today={true} />
                <NumberInput register={register} label={'Amount'} registerValue={'amount'} isRequired={true} />
                <SelectInput register={register} label={'Currency'} registerValue={'currency'} categories={currencyCategories} isRequired={true} />
                <SelectInput register={register} label={'Source'} registerValue={'source'} categories={incomeSources} isRequired={true} />
                <div className='flex justify-between pt-4'>
                    {selectedMake && <DeleteButton onClick={handleDelete} />}
                    <div className='flex space-x-3'>
                        <CancelButton onClick={closeForm} />
                        <SaveButton styling={'bg-l-green hover:bg-ld-green'} />
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default MakeForm;
