import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import ItemForm from './ItemForm';

type Props = {
    isOpen: boolean;
    closeForm: any;
    spends: Spend[];
    setSpends: any;
};

const NewSpend = ({ isOpen, closeForm, spends, setSpends }: Props) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<any> = (transaction: any) => {
        addSpend(transaction);
        closeForm();
        let newSpends = [...spends, transaction];
        setSpends(newSpends);
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
            <div className='absolute top-0 left-0 z-40 flex h-screen w-screen items-center justify-center bg-black/60 text-primary dark:text-primary-dark'>
                <div className='z-50 w-fit rounded-lg border-gray-700 bg-secondary py-12 px-16 dark:bg-[#1a1a1a]'>
                    <div className='text-[14px] font-light'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h2 className='text-selected flex w-full justify-center text-base'>Money Spent</h2>
                            <div className='flex basis-1/3 cursor-pointer justify-end text-gray-500 transition duration-200 hover:text-red-600' onClick={closeForm}>
                                <i className='fi fi-rr-cross text-sm'></i>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                            <div className='flex items-center justify-between space-x-2'>
                                <i className='fi fi-rr-shop'></i>
                                <span className='text-xs font-medium uppercase'>Store</span>
                                <div className='basic-button w-fit'>
                                    <input {...register('store')} placeholder='Store*' className='input-field text-right' required />
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
                            <div className='flex items-center justify-between pt-4'>
                                <h2 className='text-sm font-normal'>Items</h2>
                                <button className='' type='button' onClick={() => appendItem({})}>
                                    <span>+ Add Item</span>
                                </button>
                            </div>
                            <div className='scrollbar-thin scrollbar-thumb-ct-yellow max-h-[170px] space-y-1 overflow-y-auto'>
                                {items.map((item, i) => (
                                    <ItemForm key={item.id} control={control} index={i} remove={removeItem} />
                                ))}
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

export default NewSpend;
