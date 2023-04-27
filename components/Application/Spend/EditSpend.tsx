import { SubmitHandler, useForm } from 'react-hook-form';

type Props = {
    isOpen: boolean;
    closeForm: any;
};

const EditSpend = ({ isOpen, closeForm }: Props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit: SubmitHandler<any> = (transaction: any) => {
        console.log('Raw transaction: ', transaction);
        addSave(transaction);
    };

    async function addSave(transaction: Spend) {
        try {
            const response = await fetch('/api/add-spend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    store: transaction.store,
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

    if (isOpen) {
        return (
            <div className='absolute top-0 left-0 h-screen w-screen  text-primary dark:text-primary-dark '>
                <div className='relative top-[50%] left-[50%] right-auto bottom-auto z-40 mr-[-50%] h-auto w-fit translate-x-[-50%] translate-y-[-50%] rounded-3xl border bg-secondary p-8 pt-6 shadow-sm dark:border-primary-dark dark:bg-secondary-dark'>
                    <div className='text-[14px] font-light'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h2 className='text-selected flex min-w-fit basis-1/3 justify-center text-base'>New Transaction</h2>
                            <div className='flex basis-1/3 cursor-pointer justify-end text-gray-500 transition duration-200 hover:text-red-600' onClick={closeForm}>
                                <i className='fi fi-rr-cross text-sm'></i>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <div className='flex'>
                                    <div className='basic-button w-60'>
                                        <i className='fi fi-rr-shop'></i>
                                        <input {...register('store')} placeholder='Store*' className='input-field uppercase' required />
                                    </div>
                                    <div className='basic-button w-20 '>
                                        <input {...register('amount')} placeholder='Amount' type='number' className='input-field  w-20 pr-4 text-center' required />
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
            </div>
        );
    }
    return null;
};

export default EditSpend;
