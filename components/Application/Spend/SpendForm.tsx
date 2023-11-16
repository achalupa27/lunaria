import { SubmitHandler, useForm } from 'react-hook-form';
import { spendingCategories } from '../../../data/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectSpending, setSpending } from '@/redux/slices/spendSlice';

type Props = {
    isOpen: boolean;
    closeForm: any;
    spendToEdit?: Spend;
};

const SpendForm = ({ isOpen, closeForm, spendToEdit }: Props) => {
    let spends = useAppSelector(selectSpending);
    const dispatch = useAppDispatch();

    let formConfig = {};

    if (spendToEdit) {
        formConfig = {
            defaultValues: {
                date: spendToEdit.date,
                item: spendToEdit.item,
                cost: spendToEdit.cost,
                category: spendToEdit.category,
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
        if (spendToEdit) editSpend(spendToEdit._id, transaction);
        else addSpend(transaction);
        closeForm();
    };

    async function addSpend(transaction: Spend) {
        try {
            const response = await fetch('/api/add-spend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: transaction.date,
                    item: transaction.item,
                    cost: transaction.cost,
                    category: transaction.category,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const newSpendId = data.insertedId;
                const transactionWithId = { ...transaction, _id: newSpendId };
                let newSpends = [...spends, transactionWithId];
                dispatch(setSpending(newSpends));
            } else {
                console.error('An error occurred');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const deleteSpend = async (spendToDelete: Spend) => {
        try {
            const response = await fetch('/api/delete-spend', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: spendToDelete._id }),
            });
            console.log(spendToDelete._id);
            if (response.ok) {
                const data = await response.json();
                console.log(data.message);

                let newSpends = spends.filter((spend) => spend._id !== spendToDelete._id);
                dispatch(setSpending(newSpends));
                closeForm();
            } else {
                console.error('An error occurred');
            }
        } catch (err) {
            console.error(err);
        }
    };

    async function editSpend(id: string, updatedTransaction: Spend) {
        try {
            const response = await fetch('/api/edit-spend', {
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

                const updatedSpends = spends.map((spend) => (spend._id === id ? { ...spend, ...updatedTransaction } : spend));
                dispatch(setSpending(updatedSpends));
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
                <div className='z-50 rounded-lg border border-l-yellow/20 bg-secondary px-12 py-12 pb-10 shadow shadow-l-yellow/10 dark:bg-slate-900'>
                    <div className='text-[14px] font-light'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h2 className='flex w-full text-xl text-l-yellow'>{spendToEdit ? 'Edit' : 'New'} Purchase</h2>
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
                                    <i className='fi fi-rr-shop'></i>
                                    <span className='font-medium'>Item</span>
                                </div>
                                <div className='basic-button w-fit'>
                                    <input {...register('item')} placeholder='Item' className='input-field text-right' required />
                                </div>
                            </div>
                            <div className='flex justify-between space-x-4'>
                                <div className='flex items-center space-x-2'>
                                    <i className='fi fi-rr-dollar'></i>
                                    <span className='font-medium'>Cost</span>
                                </div>
                                <div className='basic-button w-fit'>
                                    <input {...register('cost')} placeholder='Cost' step='any' type='number' className='input-field text-right' required />
                                </div>
                            </div>
                            <div className='flex justify-between space-x-4'>
                                <div className='flex items-center space-x-2'>
                                    <i className='fi fi-rr-apps-sort' />
                                    <span className='font-medium'>Category</span>
                                </div>
                                <select {...register(`category`)} placeholder='Category' className='input-field w-20'>
                                    {spendingCategories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex justify-between pt-4'>
                                {spendToEdit ? (
                                    <button
                                        type='button'
                                        onClick={() => {
                                            deleteSpend(spendToEdit);
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
                                    <button type='submit' className='flex w-32 items-center justify-center space-x-1 rounded-lg bg-l-yellow py-2 transition duration-100 hover:bg-ld-yellow dark:text-primary'>
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

export default SpendForm;
