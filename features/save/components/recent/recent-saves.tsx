import { formatCurrency } from '@/utils/helper';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { setTab } from '@/store/slices/tab-slice';
import Card from '@/components/ui/card';

type Props = {
    saves: Save[];
    onViewSave: (save: Save) => void;
};

const RecentSaves = ({ saves, onViewSave }: Props) => {
    // Take only the 5 most recent saves
    const recentSaves = saves?.slice(0, 5) || [];
    const dispatch = useAppDispatch();

    const handleViewAll = () => {
        dispatch(setTab('Transactions'));
        // Add a small delay to ensure the tab change happens before the URL update
        setTimeout(() => {
            window.history.pushState({}, '', '?from=Save');
        }, 0);
    };

    return (
        <Card className='flex flex-col h-full p-6'>
            <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold mb-4'>Recent Deposits</h3>
                <Button variant='ghost' className='h-7 text-sm -mr-2 dark:text-black hover:bg-orange-50' onClick={handleViewAll}>
                    View all
                </Button>
            </div>
            <div className='flex-1 min-h-0 overflow-y-auto scrollbar-none'>
                {recentSaves.map((save) => (
                    <div key={save.id} onClick={() => onViewSave(save)} className='flex cursor-pointer items-center justify-between px-2 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{save.type}</span>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className='font-medium text-blue-600'>{formatCurrency(save.amount)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default RecentSaves;
