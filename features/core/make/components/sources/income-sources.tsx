import { formatCurrency } from '@/utils/helper';
import DisplayCard from '@/components/ui/display-card';

type Props = {
    incomeBySource: Record<string, number>;
};

const NoIncomeSources = () => {
    return <div className='flex-1 min-h-0 flex items-center h-full justify-center text-zinc-500 text-sm'>No income sources</div>;
};

const IncomeSources = ({ incomeBySource }: Props) => {
    const sortedSources = Object.entries(incomeBySource)
        .sort(([, a], [, b]) => b - a) // Sort by amount in descending order
        .map(([source, amount]) => ({
            source,
            amount,
        }));

    if (sortedSources.length === 0) {
        return (
            <DisplayCard title='Income Sources'>
                <NoIncomeSources />
            </DisplayCard>
        );
    }

    return (
        <DisplayCard title='Income Sources'>
            <div className='flex-1 min-h-0 overflow-y-auto scrollbar-none'>
                {sortedSources.map(({ source, amount }) => (
                    <div key={source} className='flex justify-between py-2'>
                        <div className='font-medium'>{source}</div>
                        <div className='font-medium text-green-600'>{formatCurrency(amount)}</div>
                    </div>
                ))}
                {sortedSources.length === 0 && <div className='flex items-center justify-center text-gray-500'>No income sources</div>}
            </div>
        </DisplayCard>
    );
};

export default IncomeSources;
