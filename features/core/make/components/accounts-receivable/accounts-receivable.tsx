import { formatCurrency } from '@/utils/helper';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import DisplayCard from '@/components/ui/display-card';

type Props = {
    receivables: Make[];
    onViewReceivable: (make: Make) => void;
};

const NoReceivables = () => {
    return <div className='flex-1 min-h-0 flex items-center h-full justify-center text-zinc-500 text-sm'>No accounts receivable</div>;
};

const AccountsReceivable = ({ receivables, onViewReceivable }: Props) => {
    // Sort receivables by date (closest first)
    const sortedReceivables = [...receivables].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (sortedReceivables.length === 0) {
        return (
            <DisplayCard title='Accounts Receivable'>
                <NoReceivables />
            </DisplayCard>
        );
    }

    return (
        <DisplayCard title='Accounts Receivable'>
            <div className='flex-1 min-h-0 overflow-y-auto scrollbar-none'>
                {sortedReceivables.map((receivable) => (
                    <div key={receivable.id} onClick={() => onViewReceivable(receivable)} className='p-2 flex cursor-pointer items-center justify-between rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{receivable.source}</span>
                            <span className='text-xs text-zinc-500'>{format(new Date(receivable.date), 'MMM d, yyyy')}</span>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className='font-medium text-amber-600'>{formatCurrency(receivable.amount)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </DisplayCard>
    );
};

export default AccountsReceivable;
