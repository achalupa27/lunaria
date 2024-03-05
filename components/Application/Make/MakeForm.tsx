import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectMaking } from '@/redux/slices/makeSlice';
import Modal from '@/components/UI/Modals/Modal';
import { selectUser } from '@/redux/slices/userSlice';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import DateInput from '@/components/UI/Inputs/DateInput';
import NumberInput from '@/components/UI/Inputs/NumberInput';
import SelectInput from '@/components/UI/Inputs/SelectInput';
import { incomeSources } from '@/data/constants';
import DeleteButton from '@/components/UI/Buttons/DeleteButton';
import CancelButton from '@/components/UI/Buttons/CancelButton';
import SaveButton from '@/components/UI/Buttons/SaveButton';

type Props = {
    isOpen: boolean;
    closeForm: any;
    makeToEdit?: Make;
};

const SaveForm = ({ isOpen, closeForm, makeToEdit }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const makes = useAppSelector(selectMaking);
    const dispatch = useAppDispatch();

    let formConfig = {};

    if (makeToEdit) {
        formConfig = {
            defaultValues: {
                date: makeToEdit.date,
                amount: makeToEdit.amount,
                source: makeToEdit.source,
            },
        };
    }

    const { register, handleSubmit } = useForm(formConfig);

    const onSubmit: SubmitHandler<any> = (make: any) => {
        if (makeToEdit) editMake(make);
        else addMake(make);
        closeForm();
    };

    const addMake = async (make: Make) => {};

    const removeMake = async (makeToDelete: Make) => {};

    const editMake = async (updatedMake: Make) => {};

    const handleDelete = () => {
        makeToEdit && removeMake(makeToEdit);
    };

    if (!isOpen) return null;

    return (
        <Modal title={makeToEdit ? 'Edit Making' : 'New Making'} closeModal={closeForm} headerStyle={'text-l-green'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                <DateInput register={register} label={'Date'} registerValue={'date'} isRequired={true} today={true} />
                <NumberInput register={register} label={'Amount'} registerValue={'amount'} isRequired={true} />
                <SelectInput register={register} label={'Source'} registerValue={'source'} categories={incomeSources} isRequired={true} />
                <div className='flex justify-between pt-4'>
                    {makeToEdit && <DeleteButton onClick={handleDelete} />}
                    <div className='flex space-x-3'>
                        <CancelButton onClick={closeForm} />
                        <SaveButton styling={'bg-l-green hover:bg-ld-green'} />
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default SaveForm;
