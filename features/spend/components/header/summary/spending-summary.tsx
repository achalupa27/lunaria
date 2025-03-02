import Card from '@/components/ui/card';
import { formatCurrency } from '@/utils/helper';

type Props = {
    totalSpent: number;
    totalNeedSpent: number;
    totalWantSpent: number;
    totalWasteSpent: number;
};

const SpendingSummary = ({ totalSpent, totalNeedSpent, totalWantSpent, totalWasteSpent }: Props) => {
    return (
        <div className='my-2 flex space-x-4'>
            <Card className='gold-gradient dark:gold-gradient'>
                <span className='leading-none'>{'All'}</span>
                <div className='space-x-2 mt-1'>
                    <span className='text-3xl font-semibold'>{formatCurrency(totalSpent)}</span>
                </div>
            </Card>
            <Card className=''>
                <span className='leading-none'>{'Need'}</span>
                <div className='space-x-2 mt-1'>
                    <span className='text-3xl font-semibold'>{formatCurrency(totalNeedSpent)}</span>
                </div>
            </Card>
            <Card className=''>
                <span className='leading-none'>{'Want'}</span>
                <div className='space-x-2 mt-1'>
                    <span className='text-3xl font-semibold'>{formatCurrency(totalWantSpent)}</span>
                </div>
            </Card>
            <Card className=''>
                <span className='leading-none'>{'Waste'}</span>
                <div className='space-x-2 mt-1'>
                    <span className='text-3xl font-semibold'>{formatCurrency(totalWasteSpent)}</span>
                </div>
            </Card>
        </div>
    );
};

export default SpendingSummary;
