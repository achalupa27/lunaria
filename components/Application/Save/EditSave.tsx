import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import ItemForm from '../Spend/ItemForm';
import { useState } from 'react';

type Props = {
    isOpen: boolean;
    closeForm: any;
};

const EditSave = ({ isOpen, closeForm }: Props) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<any> = (transaction: any) => {
        console.log('Raw transaction: ', transaction);
        addSave(transaction);
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
            <div className='absolute top-0 left-0 h-screen w-screen   text-primary dark:text-primary-dark'>
                <div className='relative top-[50%] left-[50%] right-auto bottom-auto z-40 mr-[-50%] h-auto w-fit translate-x-[-50%] translate-y-[-50%] rounded-3xl border border-primary bg-secondary p-2 pt-6 shadow-sm dark:border-primary-dark dark:bg-secondary-dark'>
                    <div className='mb-4 flex items-center justify-between'>
                        <h2 className='text-selected flex w-full justify-center text-base'>New Transaction</h2>
                        <div className='absolute right-6 cursor-pointer text-gray-500 transition duration-200 hover:text-red-600' onClick={closeForm}>
                            <i className='fi fi-rr-cross text-sm'></i>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <div className='flex'>
                                <div className='basic-button w-32' onClick={() => (type === 'Deposit' ? setType('Withdrawal') : setType('Deposit'))}>
                                    <i className='fi fi-tr-sort-alt' />
                                    <input readOnly className='text-selected read-input w-24 bg-transparent ' {...register('type')} value={type} required />
                                </div>
                                <div className='basic-button w-20 '>
                                    <input {...register('amount')} placeholder='Amount' type='number' className='input-field w-20 pr-4 text-center' required />
                                </div>
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
        );
    }
    return null;
};

export default EditSave;
