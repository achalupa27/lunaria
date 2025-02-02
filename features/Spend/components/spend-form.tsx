import { SubmitHandler, useForm } from 'react-hook-form';
import { currencyCategories, necessityCategories, spendingCategories } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addSpending, selectSpending, setSpending, updateSpendingState } from '@/redux/slices/spendSlice';
import Modal from '@/components/ui/modal';
import CancelButton from '@/components/ui/buttons/CancelButton';
import DateInput from '@/components/ui/Inputs/DateInput';
import TextInput from '@/components/ui/Inputs/TextInput';
import NumberInput from '@/components/ui/Inputs/NumberInput';
import SelectInput from '@/components/ui/Inputs/SelectInput';
import { createSpend } from '@/features/spend/services/createSpend';
import { selectUser } from '@/redux/slices/userSlice';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { deleteSpend } from '@/features/spend/services/deleteSpend';
import { updateSpend } from '@/features/spend/services/updateSpend';
import DeleteButton from '@/components/ui/buttons/DeleteButton';
import SaveButton from '@/components/ui/buttons/SaveButton';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

type Props = {
    closeForm: any;
    selectedSpend?: Spend;
};

const SpendForm = ({ closeForm, selectedSpend }: Props) => {
    const user = useAppSelector(selectUser);
    const supabaseClient = useSupabaseClient();
    const spends = useAppSelector(selectSpending);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm({ defaultValues: selectedSpend });

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

    return (
        <Modal title={selectedSpend ? 'Edit Spending' : 'New Spending'} closeModal={closeForm} headerStyle={'text-black'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <DateInput register={register} label={'Date'} registerValue={'date'} isRequired={true} today={true} />
                <TextInput register={register} label={'Item'} registerValue={'item'} isRequired={true} />
                <div className='flex space-x-2'>
                    <NumberInput register={register} label={'Cost'} registerValue={'cost'} isRequired={true} />
                    <SelectInput register={register} label={'Currency'} registerValue={'currency'} categories={currencyCategories} isRequired={true} width={'w-32'} />
                </div>
                <TextInput register={register} label={'Store'} registerValue={'store'} isRequired={true} />
                <SelectInput register={register} label={'Category'} registerValue={'category'} categories={spendingCategories} isRequired={true} />
                <SelectInput register={register} label={'Necessity'} registerValue={'necessity'} categories={necessityCategories} isRequired={true} />
                <div className={`flex pt-4 ${selectedSpend ? 'justify-between' : 'justify-end'}`}>
                    {selectedSpend && (
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

export default SpendForm;
