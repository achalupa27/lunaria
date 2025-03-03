type Props = {
    type: 'one-time' | 'recurring';
    onChange: (type: 'one-time' | 'recurring') => void;
};

const ExpenseTypeToggle = ({ type, onChange }: Props) => {
    return (
        <div className='border-orange-0 relative flex w-full overflow-hidden rounded-lg bg-white dark:bg-black mb-4'>
            <div className={`absolute left-0 top-0 h-full w-1/2 rounded-lg transition-transform duration-200 dark:bg-white ${type === 'recurring' ? 'translate-x-full bg-blue-600' : 'translate-x-0 bg-green-500'}`}></div>

            <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${type === 'one-time' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => onChange('one-time')}>
                One-time
            </div>

            <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${type === 'recurring' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => onChange('recurring')}>
                Recurring
            </div>
        </div>
    );
};

export default ExpenseTypeToggle;
