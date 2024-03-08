import { SubmitHandler, useForm } from 'react-hook-form';
import { currencyCategories, necessityCategories, spendingCategories } from '../../../data/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSpending, selectSpending, setSpending, updateSpendingState } from '@/redux/slices/spendSlice';
import Modal from '@/components/UI/Modals/Modal';
import CancelButton from '@/components/UI/Buttons/CancelButton';
import DateInput from '@/components/UI/Inputs/DateInput';
import TextInput from '@/components/UI/Inputs/TextInput';
import NumberInput from '@/components/UI/Inputs/NumberInput';
import SelectInput from '@/components/UI/Inputs/SelectInput';
import { createSpend } from '@/api/spend/createSpend';
import { selectUser } from '@/redux/slices/userSlice';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { deleteSpend } from '@/api/spend/deleteSpend';
import { updateSpend } from '@/api/spend/updateSpend';
import DeleteButton from '@/components/UI/Buttons/DeleteButton';
import SaveButton from '@/components/UI/Buttons/SaveButton';
import { useEffect } from 'react';

type Props = {
    isOpen: boolean;
    closeForm: any;
    selectedSpend?: Spend;
};

const SpendForm = ({ isOpen, closeForm, selectedSpend }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const spends = useAppSelector(selectSpending);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit: SubmitHandler<any> = (spend: Spend) => {
        if (user) {
            if (selectedSpend) {
                let spendToEdit: Spend = {
                    ...spend,
                    user_email: user!.email,
                    id: selectedSpend.id,
                };

                editSpend(spendToEdit);
            } else {
                let spendToAdd: Spend = {
                    ...spend,
                    user_email: user!.email,
                };

                addSpend(spendToAdd);
            }
        } else {
            console.error('[ERROR] Could not add spend. [REASON] No user.');
        }
    };

    // Initialize form values if spendToEdit is provided
    useEffect(() => {
        if (selectedSpend) {
            setValue('date', selectedSpend.date);
            setValue('item', selectedSpend.item);
            setValue('cost', selectedSpend.cost);
            setValue('store', selectedSpend.store);
            setValue('category', selectedSpend.category);
            setValue('necessity', selectedSpend.necessity);
            setValue('currency', selectedSpend.currency);
        } else {
            setValue('date', undefined);
            setValue('item', undefined);
            setValue('cost', undefined);
            setValue('store', undefined);
            setValue('category', undefined);
            setValue('necessity', undefined);
            setValue('currency', undefined);
        }
    }, [selectedSpend, setValue]);

    const addSpend = async (spend: Spend) => {
        // Add to database
        let createdSpend = await createSpend(spend, supabaseClient);

        // Add to state
        dispatch(addSpending(createdSpend));

        closeForm();
    };

    const editSpend = async (updatedSpend: Spend) => {
        // Update database
        updateSpend(updatedSpend, supabaseClient);

        // Update state
        updateSpendingState(updatedSpend);

        closeForm();
    };

    const removeSpend = async (idToDelete: string) => {
        // Delete from database
        deleteSpend(idToDelete, supabaseClient);

        // Delete from state
        const newSpends = spends.filter((spend) => spend.id !== idToDelete);
        dispatch(setSpending(newSpends));

        closeForm();
    };

    const handleDelete = () => {
        selectedSpend && removeSpend(selectedSpend.id);
    };

    if (!isOpen) return null;

    return (
        <Modal title={selectedSpend ? 'Edit Spending' : 'New Spending'} closeModal={closeForm} headerStyle={'text-l-yellow'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <DateInput register={register} label={'Date'} registerValue={'date'} isRequired={true} today={true} />
                <TextInput register={register} label={'Item'} registerValue={'item'} isRequired={true} />
                <NumberInput register={register} label={'Cost'} registerValue={'cost'} isRequired={true} />
                <SelectInput register={register} label={'Category'} registerValue={'currency'} categories={currencyCategories} isRequired={true} />
                <TextInput register={register} label={'Store'} registerValue={'store'} isRequired={true} />
                <SelectInput register={register} label={'Category'} registerValue={'category'} categories={spendingCategories} isRequired={true} />
                <SelectInput register={register} label={'Necessity'} registerValue={'necessity'} categories={necessityCategories} isRequired={true} />
                <div className='flex justify-between pt-4'>
                    {selectedSpend ? <DeleteButton onClick={handleDelete} /> : <div />}
                    <div className='flex space-x-3'>
                        <CancelButton onClick={closeForm} />
                        <SaveButton styling={'bg-l-yellow hover:bg-ld-yellow'} />
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default SpendForm;
