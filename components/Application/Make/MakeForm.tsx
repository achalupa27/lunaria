import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectSaving, setSaving } from '@/redux/slices/saveSlice';
import { selectMaking, setMaking } from '@/redux/slices/makeSlice';

type Props = {
    isOpen: boolean;
    closeForm: any;
    makeToEdit?: Make;
};

const SaveForm = ({ isOpen, closeForm, makeToEdit }: Props) => {
    let makes = useAppSelector(selectMaking);
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

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm(formConfig);

    const onSubmit: SubmitHandler<any> = (transaction: any) => {
        if (makeToEdit) editMake(makeToEdit._id, transaction);
        else addMake(transaction);
        closeForm();
    };

    async function addMake(transaction: Make) {
        try {
            const response = await fetch('/api/add-make', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: transaction.date,
                    amount: transaction.amount,
                    source: transaction.source,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const newMakeId = data.insertedId;
                const transactionWithId = { ...transaction, _id: newMakeId };
                let newMakes = [...makes, transactionWithId];
                dispatch(setMaking(newMakes));
            } else {
                console.error('An error occurred');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const deleteMake = async (makeToDelete: Make) => {
        try {
            const response = await fetch('/api/delete-make', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: makeToDelete._id }),
            });
            console.log(makeToDelete._id);
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);

                let newMakes = makes.filter((make) => make._id !== makeToDelete._id);
                dispatch(setMaking(newMakes));
                closeForm();
            } else {
                console.error('An error occurred');
            }
        } catch (err) {
            console.error(err);
        }
    };

    async function editMake(id: string, updatedTransaction: Make) {
        try {
            const response = await fetch('/api/edit-make', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    updatedTransaction: updatedTransaction,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);

                const updatedMakes = makes.map((make) => (make._id === id ? { ...make, ...updatedTransaction } : make));
                dispatch(setMaking(updatedMakes));
            } else {
                console.error('An error occurred');
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (isOpen) {
        return (
            <div className='absolute left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-slate-900/40 text-primary dark:text-primary-dark'>
                <div className='z-50 rounded-lg border border-l-green/20 bg-secondary px-12 py-12 pb-10 shadow shadow-l-green/10 dark:bg-slate-900'>
                    <div className='text-[14px] font-light'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h2 className='flex w-full text-xl text-l-green'>{makeToEdit ? 'Edit' : 'New'} Income</h2>
                            <div className='flex h-8 w-8 cursor-pointer items-center justify-center text-slate-500 transition duration-200 hover:text-red-600' onClick={closeForm}>
                                <i className='fi fi-rr-cross text-xs'></i>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                            <div className='flex justify-between space-x-6'>
                                <div className='flex items-center space-x-2'>
                                    <i className='fi fi-rr-calendar'></i>
                                    <span className='font-medium'>Date</span>
                                </div>
                                <div className='basic-button w-full justify-end'>
                                    <input {...register('date')} placeholder='Date' type='date' className='input-field text-right' required />
                                </div>
                            </div>
                            <div className='flex justify-between space-x-4'>
                                <div className='flex items-center space-x-2'>
                                    <i className='fi fi-rr-dollar'></i>
                                    <span className='font-medium'>Amount</span>
                                </div>
                                <div className='basic-button w-fit'>
                                    <input {...register('amount')} placeholder='Amount' step='any' type='number' className='input-field text-right' required />
                                </div>
                            </div>
                            <div className='flex justify-between space-x-4'>
                                <div className='flex items-center space-x-2'>
                                    <i className='fi fi-rr-user ' />
                                    <span className='font-medium'>Source</span>
                                </div>
                                <select {...register(`source`)} placeholder='Source' className='input-field w-20'>
                                    <option value='Work'>Work </option>
                                    <option value='Dividends'>Dividends </option>
                                </select>
                            </div>
                            <div className='flex justify-between pt-4'>
                                {makeToEdit ? (
                                    <button
                                        type='button'
                                        onClick={() => {
                                            deleteMake(makeToEdit);
                                        }}
                                        className='flex w-10 items-center justify-center rounded-lg bg-red-300 py-2 transition duration-100 hover:bg-red-400 dark:text-primary'
                                    >
                                        <i className='fi fi-rr-trash' />
                                    </button>
                                ) : (
                                    <div />
                                )}
                                <div className='flex space-x-3'>
                                    <button type='button' onClick={closeForm} className='flex w-32 items-center justify-center space-x-1 rounded-lg bg-gray-300 py-2 transition duration-100 hover:bg-gray-400 dark:text-primary'>
                                        <span>Cancel</span>
                                    </button>
                                    <button type='submit' className='flex w-32 items-center justify-center space-x-1 rounded-lg bg-l-green py-2 transition duration-100 hover:bg-ld-green dark:text-primary'>
                                        <i className='fi fi-rr-check'></i>
                                        <span>Save</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default SaveForm;
