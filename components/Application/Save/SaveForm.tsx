import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectSaving, setSaving } from '@/redux/slices/saveSlice';

type Props = {
    isOpen: boolean;
    closeForm: any;
    saveToEdit?: Save;
};

const SaveForm = ({ isOpen, closeForm, saveToEdit }: Props) => {
    let saves = useAppSelector(selectSaving);
    const dispatch = useAppDispatch();

    let formConfig = {};

    if (saveToEdit) {
        formConfig = {
            defaultValues: {
                date: saveToEdit.date,
                type: saveToEdit.type,
                amount: saveToEdit.amount,
                account: saveToEdit.account,
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
        if (saveToEdit) editSave(saveToEdit._id, transaction);
        else addSave(transaction);
        closeForm();
    };

    async function addSave(transaction: Save) {
        try {
            const response = await fetch('/api/add-save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: transaction.date,
                    type: transaction.type,
                    amount: transaction.amount,
                    account: transaction.account,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const newSaveId = data.insertedId;
                const transactionWithId = { ...transaction, _id: newSaveId };
                let newSaves = [...saves, transactionWithId];
                dispatch(setSaving(newSaves));
            } else {
                console.error('An error occurred');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const deleteSave = async (saveToDelete: Save) => {
        try {
            const response = await fetch('/api/delete-save', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: saveToDelete._id }),
            });
            console.log(saveToDelete._id);
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);

                let newSaves = saves.filter((save) => save._id !== saveToDelete._id);
                dispatch(setSaving(newSaves));
                closeForm();
            } else {
                console.error('An error occurred');
            }
        } catch (err) {
            console.error(err);
        }
    };

    async function editSave(id: string, updatedTransaction: Save) {
        try {
            const response = await fetch('/api/edit-save', {
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

                const updatedSaves = saves.map((save) => (save._id === id ? { ...save, ...updatedTransaction } : save));
                dispatch(setSaving(updatedSaves));
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
                <div className='z-50 rounded-lg border border-l-blue/20 bg-secondary px-12 py-12 pb-10 shadow shadow-l-blue/10 dark:bg-slate-900'>
                    <div className='text-[14px] font-light'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h2 className='flex w-full text-xl text-l-blue'>{saveToEdit ? 'Edit' : 'New'} Transaction</h2>
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
                                    <i className='fi fi-rr-apps-sort' />
                                    <span className='font-medium'>Type</span>
                                </div>
                                <select {...register(`type`)} placeholder='Type' className='input-field w-20'>
                                    <option value='Deposit'>Deposit </option>
                                    <option value='Withdrawal'>Withdrawal </option>
                                </select>
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
                                    <span className='font-medium'>Account</span>
                                </div>
                                <select {...register(`account`)} placeholder='Account' className='input-field w-20'>
                                    <option value='TFSA'>TFSA </option>
                                    <option value='RRSP'>RRSP </option>
                                </select>
                            </div>
                            <div className='flex justify-between pt-4'>
                                {saveToEdit ? (
                                    <button
                                        type='button'
                                        onClick={() => {
                                            deleteSave(saveToEdit);
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
                                    <button type='submit' className='flex w-32 items-center justify-center space-x-1 rounded-lg bg-l-blue py-2 transition duration-100 hover:bg-ld-blue dark:text-primary'>
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
