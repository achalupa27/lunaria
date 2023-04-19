import { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import ItemForm from './ItemForm';

type Props = {
    isOpen: boolean;
    createTransaction: any;
    closeForm: any;
};

const NewTradeForm = ({ isOpen, createTransaction, closeForm }: Props) => {
    const [formType, setFormType] = useState('New Trade');
    const [privacy, setPrivacy] = useState('Private');
    const [side, setSide] = useState('Long');
    const [period, setPeriod] = useState('Day');

    const [datePicker, showDatePicker] = useState<boolean>(false);

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
        fields: entries,
        append: appendEntry,
        remove: removeEntry,
    } = useFieldArray({
        control,
        name: 'entries',
    });

    const handlePeriod = () => {
        if (period === 'Day') setPeriod('Swing');
        else if (period === 'Swing') setPeriod('Core');
        else setPeriod('Day');
    };

    const handleFormType = () => {
        if (formType === 'New Trade') setFormType('Import');
        else setFormType('New Trade');
    };

    if (isOpen) {
        return (
            <div className='absolute top-0 left-0 h-screen w-screen  text-primary dark:text-primary-dark '>
                <div className='relative top-[50%] left-[50%] right-auto bottom-auto z-40 mr-[-50%] h-auto w-fit translate-x-[-50%] translate-y-[-50%] rounded-md border bg-white p-8 pt-6 shadow-sm'>
                    <div className='text-[14px] font-light' onClick={() => (datePicker ? showDatePicker(false) : null)}>
                        <div className='mb-4 flex items-center justify-between '>
                            <div className='flex basis-1/3'>
                                <div className='basic-button' onClick={handleFormType}>
                                    <i className='fi fi-tr-folder-upload'></i>
                                    <span>Clear</span>
                                </div>
                            </div>
                            <h2 className='text-selected flex min-w-fit basis-1/3 justify-center px-4 text-base font-normal'>New Transaction</h2>
                            <div className='flex basis-1/3 justify-end'>
                                <div className='cursor-pointer  transition duration-200 hover:text-red-600' onClick={closeForm}>
                                    <i className='fi fi-rr-cross text-sm'></i>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                            <div className='flex items-center justify-between rounded-sm border p-1 dark:border-[#857f72] '>
                                <div className='flex'>
                                    <div className='basic-button w-24'>
                                        <i className='fi fi-tr-search-dollar' />
                                        <input {...register('symbol')} placeholder='Store*' className='input-field uppercase' required />
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-center space-x-3 pt-4'>
                                <h2 className='text-sm font-normal'>Items</h2>
                                <i className='fi fi-tr-square-plus h-5 cursor-pointer text-xl transition duration-200 hover:text-green-600' onClick={() => appendEntry({})}></i>
                            </div>
                            <div className='scrollbar-thin scrollbar-thumb-ct-yellow max-h-[170px] space-y-1 overflow-y-auto'>
                                {entries.map((entry, i) => (
                                    <ItemForm key={entry.id} control={control} index={i} remove={removeEntry} />
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

export default NewTradeForm;
