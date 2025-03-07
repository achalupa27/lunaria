import Card from '@/components/ui/card';
import { formatCurrency } from '@/utils/helper';

type Props = {
    totalIncome: number;
    incomeBySource: Record<string, number>;
};

const IncomeSummary = ({ totalIncome, incomeBySource }: Props) => {
    return (
        <div className='my-2 flex space-x-6'>
            <Card className='gold-gradient dark:text-zinc-920'>
                <span className='leading-none'>All Sources</span>
                <div className='space-x-2 mt-1'>
                    <span className='text-3xl font-semibold'>{formatCurrency(totalIncome)}</span>
                </div>
            </Card>
            {Object.entries(incomeBySource).map(([source, amount]) => (
                <Card key={source}>
                    <span className='leading-none'>{source}</span>
                    <div className='space-x-2 mt-1'>
                        <span className='text-3xl font-semibold'>{formatCurrency(amount)}</span>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default IncomeSummary;
