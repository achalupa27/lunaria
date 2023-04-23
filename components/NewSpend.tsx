import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import ItemForm from './ItemForm';

type Props = {
    isOpen: boolean;
    createTransaction: any;
    closeForm: any;
};

const NewSpend = ({ isOpen, createTransaction, closeForm }: Props) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit: SubmitHandler<any> = (transaction: any) => {
        console.log('Raw transaction: ', transaction);
        createTransaction(transaction);
    };

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
                                        <input {...register('number')} placeholder='Amount' type='number' className='input-field  w-20 pr-4 text-center' required />
                                    </div>
                                    <div className='basic-button w-36 justify-end'>
                                        <input {...register('date')} placeholder='Date' type='date' className='input-field' required />
                                    </div>
                                </div>
                            </div>
                            {/* <div className='flex items-center justify-between pt-4'>
                                <h2 className='text-sm font-normal'>Items</h2>
                                <button className='flex items-center rounded-md border border-primary/50 px-2 py-1 text-primary/50 transition duration-200 hover:border-green-500 hover:text-green-600 dark:border-primary/50 dark:text-primary/50' onClick={() => appendItem({})}>
                                    <span>+ Add Item</span>
                                </button>
                            </div>
                            <div className='scrollbar-thin scrollbar-thumb-ct-yellow max-h-[170px] space-y-1 overflow-y-auto'>
                                {items.map((item, i) => (
                                    <ItemForm key={item.id} control={control} index={i} remove={removeItem} />
                                ))}
                            </div> */}

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
