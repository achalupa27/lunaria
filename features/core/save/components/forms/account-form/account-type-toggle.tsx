type Props = {
    accountType: 'Savings' | 'Debt';
    setAccountType: (accountType: 'Savings' | 'Debt') => void;
};

const AccountTypeToggle = ({ accountType, setAccountType }: Props) => {
    return (
        <div className='border-orange-0 relative mb-4 flex w-full overflow-hidden rounded-lg bg-white dark:bg-black'>
            <div className={`absolute left-0 top-0 h-full w-1/2 rounded-lg transition-transform duration-200 dark:bg-white ${accountType === 'Debt' ? 'translate-x-full bg-red-600' : 'translate-x-0 bg-green-500'}`}></div>

            <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${accountType === 'Savings' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setAccountType('Savings')}>
                Savings Account
            </div>

            <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${accountType === 'Debt' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setAccountType('Debt')}>
                Debt Account
            </div>
        </div>
    );
};

export default AccountTypeToggle;
