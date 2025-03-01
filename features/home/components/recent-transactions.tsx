import { formatCurrency } from '@/utils/helper';
import { format, parseISO } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { setTab } from '@/store/slices/tab-slice';
import Card from '@/components/ui/card';

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
                amount: transaction.amount,
                type: 'Savings',
                color: 'text-blue-600',
            };
        }
    };

    return (
        <Card>
            <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold p-4 pb-2'>Recent Transactions</h3>
                <Button variant='ghost' className='h-7 dark:text-black hover:bg-orange-100/50' onClick={handleViewAll}>
                    View all
                    <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
            </div>
            <div className='flex-1 overflow-y-auto p-4'>
                {allTransactions.map((transaction) => {
                    const { description, amount, type, color } = getTransactionDetails(transaction);
                    return (
                        <div key={transaction.id} onClick={() => onViewTransaction(transaction)} className=' flex cursor-pointer items-center rounded-md justify-between p-2 hover:bg-zinc-50 dark:hover:bg-zinc-900'>
                            <div className='flex flex-col'>
                                <div className='flex items-center space-x-2'>
                                    <span className='font-medium'>{description}</span>
                                    <span className='text-xs text-gray-500'>({type})</span>
                                </div>
                            </div>
                            <div className='flex flex-col items-end'>
                                <span className={`font-medium ${color}`}>{formatCurrency(amount)}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default RecentTransactions;
