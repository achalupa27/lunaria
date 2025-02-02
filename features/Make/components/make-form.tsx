import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addMaking, selectMaking, setMaking, updateMakingState } from '@/redux/slices/makeSlice';
import Modal from '@/components/ui/modal';
import { selectUser } from '@/redux/slices/userSlice';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import DateInput from '@/components/ui/Inputs/DateInput';
import NumberInput from '@/components/ui/Inputs/NumberInput';
import SelectInput from '@/components/ui/Inputs/SelectInput';
import { currencyCategories, incomeSources } from '@/constants';
import { useEffect, useState } from 'react';
import { createMake } from '@/features/make/services/create-make-service';
import { updateMake } from '@/features/make/services/update-make-service';
import { deleteMake } from '@/features/make/services/delete-make-service';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import AmountInput from '@/components/ui/Inputs/AmountInput';

type Props = {
    closeForm: any;
    selectedMake?: Make;
};

const MakeForm = ({ closeForm, selectedMake }: Props) => {
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

    const [term, setTerm] = useState<'Deposit' | 'Withdrawal'>('Deposit');

    return (
        <Modal title={selectedMake ? 'Edit Making' : 'New Making'} closeModal={closeForm} headerStyle={'text-black'}>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                <div className='border-orange-0 relative flex w-full overflow-hidden rounded-full border bg-white dark:bg-black'>
                    <div className={`absolute left-0 top-0 h-full w-1/2 rounded-full transition-transform  duration-200 dark:bg-white ${term === 'Withdrawal' ? 'translate-x-full bg-green-500' : 'translate-x-0 bg-green-500 '}`}></div>

                    <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${term === 'Deposit' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setTerm('Deposit')}>
                        One-Time
                    </div>

                    <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${term === 'Withdrawal' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setTerm('Withdrawal')}>
                        Recurring
                    </div>
                </div>
                <DateInput register={register} label={'Date'} registerValue={'date'} isRequired={true} today={true} />
                <AmountInput />
                {/* <NumberInput register={register} label={'Amount'} registerValue={'amount'} isRequired={true} /> */}
                {/* <SelectInput register={register} label={'Currency'} registerValue={'currency'} categories={currencyCategories} isRequired={true} /> */}
                <SelectInput register={register} label={'Source'} registerValue={'source'} categories={incomeSources} isRequired={true} />

                <div className={`flex pt-4 ${selectedMake ? 'justify-between' : 'justify-end'}`}>
                    {selectedMake && (
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

export default MakeForm;
