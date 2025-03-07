import { formatCurrency } from '@/utils/helper';
import Card from '@/components/ui/card';
import DisplayCard from '@/components/ui/display-card';
type Props = {
    accounts: SavingsAccount[];
    onViewAccount: (account: SavingsAccount) => void;
};

const NoSavingsAccounts = () => {
    return <div className='flex-1 min-h-0 flex items-center h-full justify-center text-zinc-500 text-sm'>No savings accounts</div>;
};

const SavingsAccounts = ({ accounts, onViewAccount }: Props) => {
    if (!accounts || accounts.length === 0) {
        return (
            <DisplayCard title='Savings Accounts'>
                <NoSavingsAccounts />
            </DisplayCard>
        );
    }

    return (
        <DisplayCard title='Savings Accounts'>
            <div className='flex-1 min-h-0 overflow-y-auto scrollbar-none'>
                {accounts.map((account) => (
                    <div key={account.id} onClick={() => onViewAccount(account)} className='flex cursor-pointer items-center justify-between px-2 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{account.name}</span>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className='font-medium text-blue-600'>{formatCurrency(account.balance)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </DisplayCard>
    );
};

export default SavingsAccounts;
