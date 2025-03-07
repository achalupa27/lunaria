import { UseFormSetValue } from 'react-hook-form';

type Props = {
    type: 'Deposit' | 'Withdrawal';
    setType: (type: 'Deposit' | 'Withdrawal') => void;
    setValue: UseFormSetValue<any>;
};

const SaveTypeToggle = ({ type, setType, setValue }: Props) => {
    return (
        <div className='border-orange-0 relative flex w-full overflow-hidden rounded-lg  bg-white dark:bg-black'>
            <div className={`absolute left-0 top-0 h-full w-1/2 rounded-lg transition-transform duration-200 dark:bg-white ${type === 'Withdrawal' ? 'translate-x-full bg-red-600' : 'translate-x-0 bg-green-500 '}`}></div>

            <div
                className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${type === 'Deposit' ? 'text-white dark:text-black' : 'text-zinc-500'}`}
                onClick={() => {
                    setType('Deposit');
                    setValue('type', 'Deposit');
                }}>
                Deposit
            </div>

            <div
                className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${type === 'Withdrawal' ? 'text-white dark:text-black' : 'text-zinc-500'}`}
                onClick={() => {
                    setType('Withdrawal');
                    setValue('type', 'Withdrawal');
                }}>
                Withdrawal
            </div>
        </div>
    );
};

export default SaveTypeToggle;
