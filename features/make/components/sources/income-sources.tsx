import { formatCurrency } from '@/utils/helper';
import Card from '@/components/ui/card';

type Props = {
    incomeBySource: Record<string, number>;
};

const IncomeSources = ({ incomeBySource }: Props) => {
    const sortedSources = Object.entries(incomeBySource)
        .sort(([, a], [, b]) => b - a) // Sort by amount in descending order
        .map(([source, amount]) => ({
            source,
            amount,
        }));

    return (
        <Card className='flex flex-col h-full p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-semibold'>Income Sources</h3>
            </div>
            <div className='flex-1 min-h-0 overflow-y-auto scrollbar-none'>
                {sortedSources.map(({ source, amount }) => (
                    <div key={source} className='flex justify-between py-2'>
                        <div className='font-medium'>{source}</div>
                        <div className='font-medium text-green-600'>{formatCurrency(amount)}</div>
                    </div>
                ))}
                {sortedSources.length === 0 && <div className='flex items-center justify-center text-gray-500'>No income sources</div>}
            </div>
        </Card>
    );
};

export default IncomeSources;
