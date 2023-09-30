import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

type Props = {
    isOpen: boolean;
    closeForm: any;
};

const NewMake = ({ isOpen, closeForm }: Props) => {
    const { register, handleSubmit } = useForm();

    const onSubmit: SubmitHandler<any> = (transaction: Make) => {
        addSave(transaction);
        closeForm();
        // let newMakes = [...makes, transaction];
        // setMakes(newMakes);
    };

    async function addSave(transaction: Make) {
        try {
            const response = await fetch('/api/add-make', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    source: transaction.source,
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
            <div className='absolute top-0 left-0 h-screen w-screen text-primary dark:text-primary-dark'>
                <div className='z-40 flex h-full justify-end'>
                    <div className='h-full w-fit rounded-md bg-secondary p-2 pt-6 shadow-sm dark:bg-[#2c2c2c]'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h2 className='text-selected flex w-full justify-center text-base font-normal'>Made Money!</h2>
                            <div className='absolute right-6 cursor-pointer text-gray-500 transition duration-200 hover:text-red-600' onClick={closeForm}>
                                <i className='fi fi-rr-cross text-sm'></i>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                            <div className='flex items-center justify-between'>
                                <div className='flex'>
                                    <div className='basic-button w-32'>
                                        <i className='fi fi-rr-dollar'></i>
                                        <input {...register('source')} placeholder='Source*' className='input-field' required />
                                    </div>
                                    <div className='basic-button w-32'>
                                        <i className='fi fi-rr-dollar'></i>
                                        <input {...register('amount')} placeholder='Amount*' className='input-field' required />
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

export default NewMake;
