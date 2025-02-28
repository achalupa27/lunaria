import { formatCurrency } from '@/utils/helper';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { setTab } from '@/store/slices/tab-slice';
import Card from '@/components/ui/card';

type Props = {
    makes: Make[];
    onViewMake: (make: Make) => void;
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

    return (
        <Card className='flex flex-col h-full p-6'>
            <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold p-4 pb-2'>Recent Income</h3>
                <Button variant='ghost' className='h-7 dark:text-black hover:bg-orange-100/50' onClick={handleViewAll}>
                    View all
                    <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
            </div>
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
        </Card>
    );
};

export default RecentMakes;
