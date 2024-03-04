import { SubmitHandler, useForm } from 'react-hook-form';
import { necessityCategories, spendingCategories } from '../../../data/constants';
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

type Props = {
    isOpen: boolean;
    closeForm: any;
    spendToEdit?: Spend;
};

const SpendForm = ({ isOpen, closeForm, spendToEdit }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const spends = useAppSelector(selectSpending);
    const dispatch = useAppDispatch();

    let formConfig = {};

    if (spendToEdit) {
        formConfig = {
            defaultValues: {
                date: spendToEdit.date,
                item: spendToEdit.item,
                cost: spendToEdit.cost,
                category: spendToEdit.category,
                store: spendToEdit.store,
                necessity: spendToEdit.necessity,
            },
        };
    }

    const { register, handleSubmit } = useForm(formConfig);

    const onSubmit: SubmitHandler<any> = (spend: Spend) => {
        if (spendToEdit) editSpend(spend);
        else addSpend(spend);
        closeForm();
    };

    const addSpend = async (spend: Spend) => {
        if (user) {
            let spendToAdd = {
                ...spend,
                user_email: user?.email,
            };

            // Add to database
            let createdSpend = await createSpend(spendToAdd, supabaseClient);

            // Update state
            dispatch(addSpending(createdSpend));
        } else {
            console.error('[ERROR] Could not add spend. [REASON] No user.');
        }
    };

    const editSpend = (updatedSpend: Spend) => {
        // Update database
        updateSpend(updatedSpend, supabaseClient);

        // Update state
        updateSpendingState(updatedSpend);
    };

    const removeSpend = async (idToDelete: string) => {
        // Delete spend from database
        deleteSpend(idToDelete, supabaseClient);

        // Delete from store
        const newSpends = spends.filter((spend) => spend.id !== idToDelete);
        dispatch(setSpending(newSpends));

        closeForm();
    };

    if (!isOpen) return null;

    return (
        <Modal title={spendToEdit ? 'Edit Spending' : 'New Spending'} closeModal={closeForm} headerStyle={'text-l-yellow'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <DateInput register={register} label={'Date'} registerValue={'date'} isRequired={true} today={true} />
                <TextInput register={register} label={'Item'} registerValue={'item'} isRequired={true} />
                <NumberInput register={register} label={'Cost'} registerValue={'cost'} isRequired={true} />
                <TextInput register={register} label={'Store'} registerValue={'store'} isRequired={true} />
                <SelectInput register={register} label={'Category'} registerValue={'category'} categories={spendingCategories} isRequired={true} />
                <SelectInput register={register} label={'Necessity'} registerValue={'necessity'} categories={necessityCategories} isRequired={true} />
                <div className='flex justify-between pt-4'>
                    {spendToEdit ? (
                        <button
                            type='button'
                            onClick={() => {
                                removeSpend(spendToEdit.id);
                            }}
                            className='flex w-10 items-center justify-center rounded-lg bg-red-300 py-2 transition duration-100 hover:bg-red-400 dark:text-primary'>
                            <i className='fi fi-rr-trash' />
                        </button>
                    ) : (
                        <div />
                    )}
                    <div className='flex space-x-3'>
                        <CancelButton onClick={closeForm} />
                        <button type='submit' className='flex w-32 items-center justify-center space-x-2 rounded-lg bg-l-yellow py-2 transition duration-100 hover:bg-l-dark-yellow dark:text-primary'>
                            <i className='fi fi-rr-check'></i>
                            <span>Save</span>
                        </button>
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default SpendForm;
