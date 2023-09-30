import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import ItemForm from './ItemForm';

type Props = {
    isOpen: boolean;
    closeForm: any;
};

const NewSpend = ({ isOpen, closeForm }: Props) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<any> = (transaction: any) => {
        addSpend(transaction);
        closeForm();
        // let newSpends = [...spends, transaction];
        // setSpends(newSpends);
    };

    async function addSpend(transaction: Spend) {
        try {
            const response = await fetch('/api/add-spend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    store: transaction.store,
                    total: transaction.total,
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

    const {
        fields: items,
        append: appendItem,
        remove: removeItem,
    } = useFieldArray({
        control,
        name: 'items',
    });

    if (isOpen) {
        return (
            <div className='absolute top-0 left-0 z-40 flex h-screen w-screen items-center justify-center bg-slate-900/40 text-primary dark:text-primary-dark'>
                <div className='z-50 rounded-lg border border-l-yellow bg-secondary py-12 px-12 pb-10 shadow-lg shadow-l-green/10 dark:bg-slate-900'>
                    <div className='text-[14px] font-light'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h2 className='flex w-full text-base text-l-yellow'>New Spending Transaction</h2>
                            <div className='flex cursor-pointer justify-end text-slate-500 transition duration-200 hover:text-red-600' onClick={closeForm}>
                                <i className='fi fi-rr-cross text-xs'></i>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                            <div className='flex items-center justify-between pt-4'>
                                <h2 className='text-sm font-normal'>Items</h2>
                                <button className='duration-50 rounded-lg border px-2 transition hover:bg-secondary hover:text-primary' type='button' onClick={() => appendItem({})}>
                                    <span>+ Add Item</span>
                                </button>
                            </div>
                            <div className='scrollbar-thin scrollbar-thumb-ct-yellow max-h-[170px] space-y-1 overflow-y-auto pb-4'>
                                {items.map((item, i) => (
                                    <ItemForm key={item.id} control={control} index={i} remove={removeItem} />
                                ))}
                            </div>
                            <div className='flex justify-between space-x-4 border-t border-slate-600/50 pt-4'>
                                <div className='flex items-center space-x-2'>
                                    <i className='fi fi-rr-shop'></i>
                                    <span className='text-xs font-medium uppercase'>Store</span>
                                </div>
                                <div className='basic-button w-fit'>
                                    <input {...register('store')} placeholder='Store*' className='input-field text-right' required />
                                </div>
                            </div>
                            <div className='flex justify-between space-x-4'>
                                <div className='flex items-center space-x-2'>
                                    <i className='fi fi-rr-dollar'></i>
                                    <span className='text-xs font-medium uppercase'>Total</span>
                                </div>
                                <div className='basic-button w-fit'>
                                    <input {...register('total')} placeholder='Total' type='number' className='input-field text-right' required />
                                </div>
                            </div>
                            <div className='flex justify-between space-x-6 pb-6'>
                                <div className='flex items-center space-x-2'>
                                    <i className='fi fi-rr-calendar'></i>
                                    <span className='text-xs font-medium uppercase'>Date</span>
                                </div>
                                <div className='basic-button w-full justify-end'>
                                    <input {...register('date')} placeholder='Date' type='date' className='input-field text-right' required />
                                </div>
                            </div>

                            <button type='submit' className='flex w-full items-center justify-center space-x-1 rounded-lg bg-l-yellow py-2 dark:text-primary'>
                                <i className='fi fi-rr-check'></i>
                                <span>Save</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default NewSpend;
