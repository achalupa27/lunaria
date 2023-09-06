import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import ItemForm from '../Spend/ItemForm';
import { useState } from 'react';

type Props = {
    isOpen: boolean;
    closeForm: any;
    saves: Save[];
    setSaves: any;
};

const NewSave = ({ isOpen, closeForm, saves, setSaves }: Props) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<any> = (transaction: any) => {
        addSave(transaction);
        closeForm();
        let newSaves = [...saves, transaction];
        setSaves(newSaves);
    };

    async function addSave(transaction: Save) {
        try {
            const response = await fetch('/api/add-save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: transaction.type,
                    amount: transaction.amount,
                    date: transaction.date,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
            } else {
                console.error('An error occurred');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const [type, setType] = useState('Deposit');
    if (isOpen) {
        return (
            <div className='absolute top-0 left-0 h-screen w-screen bg-gray-900/70 text-primary dark:text-primary-dark'>
                <div className='z-40 flex h-screen items-center justify-center'>
                    <div className='rounded-lg border-gray-700 bg-secondary py-4 px-6 shadow-md shadow-gray-400/30 dark:bg-[#1a1a1a]'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h2 className='flex justify-center text-base'>New Savings Transaction</h2>
                            <div className='relative right-2 cursor-pointer text-gray-500 transition duration-200 hover:text-red-600' onClick={closeForm}>
                                <i className='fi fi-rr-cross text-sm' />
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                            <div className='flex w-72 flex-col'>
                                <div className='flex items-center justify-between'>
                                    <div className='text-xs font-medium uppercase'>Type</div>
                                    <div className='basic-button w-fit' onClick={() => (type === 'Deposit' ? setType('Withdrawal') : setType('Deposit'))}>
                                        <input readOnly className='text-selected read-input w-20 bg-transparent text-right' {...register('type')} value={type} required />
                                        <i className='fi fi-tr-sort-alt text-xs' />
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='text-xs font-medium uppercase'>Amount</div>
                                    <div className='basic-button w-20 '>
                                        <input {...register('amount')} placeholder='Amount' type='number' className='input-field w-20 pr-4 text-right' required />
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='text-xs font-medium uppercase'>Date</div>
                                    <div className='basic-button w-36 justify-end'>
                                        <input {...register('date')} placeholder='Date' type='date' className='input-field' required />
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='cta-button w-full'>
                                <i className='fi fi-rr-check'></i>
                                <label>Save</label>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default NewSave;
