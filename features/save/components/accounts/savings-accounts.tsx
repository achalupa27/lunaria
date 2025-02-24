import { formatCurrency } from '@/utils/helper';
import Card from '@/components/ui/card';

type Props = {
    accounts: SavingsAccount[];
    onViewAccount: (account: SavingsAccount) => void;
};

const SavingsAccounts = ({ accounts, onViewAccount }: Props) => {
    if (!accounts?.length) return null;

    return (
        <Card className='px-8 py-6'>
            <div className='flex justify-between'>
                <h3 className='text-lg font-semibold mb-4'>Savings Accounts</h3>
            </div>
            <div className='flex-1 overflow-y-auto'>
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
        </Card>
    );
};

export default SavingsAccounts;
