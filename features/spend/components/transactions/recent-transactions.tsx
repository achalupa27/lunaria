import { formatCurrency } from '@/utils/helper';
import { format, parseISO } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/redux/hooks';
import { setTab } from '@/redux/slices/tab-slice';

type Props = {
    spends: Spend[];
    onViewSpend: (spend: Spend) => void;
};

const RecentTransactions = ({ spends, onViewSpend }: Props) => {
    // Take only the 5 most recent transactions
    const recentSpends = spends.slice(0, 5);
    const dispatch = useAppDispatch();

    const handleViewAll = () => {
        dispatch(setTab('Transactions'));
        // Add a small delay to ensure the tab change happens before the URL update
        setTimeout(() => {
            window.history.pushState({}, '', '?from=Spend');
        }, 0);
    };

    return (
        <div className='rounded-lg border border-orange-100 bg-white dark:bg-black shadow'>
            <div className='gold-gradient flex h-[40px] items-center justify-between rounded-lg rounded-b-none px-4'>
                <span className='dark:text-black'>Recent Purchases</span>
                <Button variant='ghost' className='h-7 dark:text-black hover:bg-orange-100/50' onClick={handleViewAll}>
                    View all
                    <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
            </div>
            <div className='flex-1 overflow-y-auto p-4'>
                {recentSpends.map((spend) => (
                    <div key={spend.id} onClick={() => onViewSpend(spend)} className='mb-3 flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-zinc-50 dark:hover:bg-zinc-900'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{spend.item}</span>
                            <span className='text-sm text-gray-500'>{format(parseISO(spend.date), 'MMM d, yyyy')}</span>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className={`font-medium ${spend.necessity === 'Need' ? 'text-green-600' : spend.necessity === 'Want' ? 'text-yellow-600' : 'text-red-600'}`}>{formatCurrency(spend.cost)}</span>
                            <span className='text-sm text-gray-500'>{spend.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
