import { formatCurrency } from '@/utils/helper';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { setTab } from '@/store/slices/tab-slice';
import Card from '@/components/ui/card';
import DisplayCard from '@/components/ui/display-card';
type Props = {
    makes: Make[];
    onViewMake: (make: Make) => void;
};

const NoRecentMakes = () => {
    return <div className='flex-1 min-h-0 flex items-center h-full justify-center text-zinc-500 text-sm'>No recent makes</div>;
};

const RecentMakes = ({ makes, onViewMake }: Props) => {
    // Take only the 5 most recent makes
    const recentMakes = makes?.slice(0, 5) || [];
    const dispatch = useAppDispatch();

    const handleViewAll = () => {
        dispatch(setTab('Transactions'));
        setTimeout(() => {
            window.history.pushState({}, '', '?from=Make');
        }, 0);
    };

    if (recentMakes.length === 0) {
        return (
            <DisplayCard title='Recent Income'>
                <NoRecentMakes />
            </DisplayCard>
        );
    }

    return (
        <DisplayCard
            title='Recent Income'
            button={
                <Button variant='ghost' className='h-7 dark:text-black hover:bg-orange-100/50' onClick={handleViewAll}>
                    View all
                </Button>
            }>
            <div className='flex-1 min-h-0 overflow-y-auto scrollbar-none'>
                {recentMakes.map((make) => (
                    <div key={make.id} onClick={() => onViewMake(make)} className='p-2 flex cursor-pointer items-center justify-between rounded-lg  hover:bg-zinc-50 dark:hover:bg-zinc-900'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{make.source}</span>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className='font-medium text-green-600'>{formatCurrency(make.amount)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </DisplayCard>
    );
};

export default RecentMakes;
