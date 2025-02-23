import { formatCurrency } from '@/utils/helper';
import { format, parseISO } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { setTab } from '@/redux/slices/tab-slice';

type Props = {
    makes: Make[];
    saves: Save[];
    spends: Spend[];
    onViewTransaction: (transaction: Make | Save | Spend) => void;
};

const RecentTransactions = ({ makes, saves, spends, onViewTransaction }: Props) => {
    const dispatch = useAppDispatch();

    // Combine and sort all transactions
    const allTransactions = [...makes, ...saves, ...spends].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

    const handleViewAll = () => {
        dispatch(setTab('Transactions'));
        setTimeout(() => {
            window.history.pushState({}, '', '?from=Home');
        }, 0);
    };

    const getTransactionDetails = (transaction: Make | Save | Spend) => {
        if ('necessity' in transaction) {
            return {
                description: transaction.item,
                amount: transaction.cost,
                type: 'Purchase',
                color: transaction.necessity === 'Need' ? 'text-green-600' : transaction.necessity === 'Want' ? 'text-yellow-600' : 'text-red-600',
            };
        } else if ('source' in transaction) {
            return {
                description: transaction.source,
                amount: transaction.amount,
                type: 'Income',
                color: 'text-green-600',
            };
        } else {
            return {
                description: transaction.goal,
                amount: transaction.amount,
                type: 'Savings',
                color: 'text-blue-600',
            };
        }
    };

    return (
        <div className='rounded-lg border border-orange-100 bg-white dark:bg-black shadow'>
            <div className='gold-gradient flex h-[40px] items-center justify-between rounded-lg rounded-b-none px-4'>
                <span className='dark:text-black'>Recent Transactions</span>
                <Button variant='ghost' className='h-7 dark:text-black hover:bg-orange-100/50' onClick={handleViewAll}>
                    View all
                    <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
            </div>
            <div className='flex-1 overflow-y-auto p-4'>
                {allTransactions.map((transaction) => {
                    const { description, amount, type, color } = getTransactionDetails(transaction);
                    return (
                        <div key={transaction.id} onClick={() => onViewTransaction(transaction)} className='mb-3 flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900'>
                            <div className='flex flex-col'>
                                <div className='flex items-center space-x-2'>
                                    <span className='font-medium'>{description}</span>
                                    <span className='text-xs text-gray-500'>({type})</span>
                                </div>
                                <span className='text-sm text-gray-500'>{format(parseISO(transaction.date), 'MMM d, yyyy')}</span>
                            </div>
                            <div className='flex flex-col items-end'>
                                <span className={`font-medium ${color}`}>{formatCurrency(amount)}</span>
                                <span className='text-sm text-gray-500'>{transaction.category}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentTransactions;
