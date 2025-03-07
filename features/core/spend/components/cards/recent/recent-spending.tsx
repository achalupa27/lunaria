import { formatCurrency } from '@/utils/helper';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { setTab } from '@/store/slices/tab-slice';
import DisplayCard from '@/components/ui/display-card';

type Props = {
    spends: Spend[];
    onViewSpend: (spend: Spend) => void;
};

const NoRecentSpending = () => {
    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <p className='text-sm text-zinc-500'>No recent spending</p>
        </div>
    );
};

const RecentSpending = ({ spends, onViewSpend }: Props) => {
    // Take only the 5 most recent transactions
    const recentSpends = spends.slice(0, 15);
    const dispatch = useAppDispatch();

    const handleViewAll = () => {
        dispatch(setTab('Transactions'));
        // Add a small delay to ensure the tab change happens before the URL update
        setTimeout(() => {
            window.history.pushState({}, '', '?from=Spend');
        }, 0);
    };

    if (!recentSpends.length) {
        return (
            <DisplayCard title='Recent Spending'>
                <NoRecentSpending />
            </DisplayCard>
        );
    }

    return (
        <DisplayCard
            title='Recent Spending'
            button={
                <Button variant='ghost' className='h-7 text-sm -mr-2' onClick={handleViewAll}>
                    View all
                </Button>
            }>
            <div className='flex-1 min-h-0 overflow-y-auto scrollbar-none'>
                {recentSpends.map((spend) => (
                    <div key={spend.id} onClick={() => onViewSpend(spend)} className='flex cursor-pointer items-center justify-between px-2 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{spend.item}</span>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className={`font-medium ${spend.necessity === 'Need' ? 'text-green-600' : spend.necessity === 'Want' ? 'text-yellow-600' : 'text-red-600'}`}>{formatCurrency(spend.cost)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </DisplayCard>
    );
};

export default RecentSpending;
