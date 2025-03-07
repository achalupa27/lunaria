import Card from '@/components/ui/card';
import { formatCurrency } from '@/utils/helper';
import { Period } from '@/components/ui/period-selector';

type Props = {
    totalSavings: number;
    totalDebt: number;
    totalAssets: number;
    netSavings: number;
    periodSaved: number;
    periodWithdrawn: number;
    selectedTerm: Period;
};

const SavingsSummary = ({ totalSavings, totalDebt, totalAssets, netSavings, periodSaved, periodWithdrawn, selectedTerm }: Props) => {
    return (
        <div className='my-2 flex space-x-6'>
            <Card className='gold-gradient dark:text-zinc-920'>
                <span className='leading-none'>Net Savings</span>
                <div className='space-x-2 mt-1'>
                    <span className='text-3xl font-semibold'>{formatCurrency(netSavings)}</span>
                </div>
            </Card>
            <Card>
                <span className='leading-none'>Savings Accounts</span>
                <div className='space-x-2 mt-1'>
                    <span className='text-3xl font-semibold'>{formatCurrency(totalSavings)}</span>
                </div>
            </Card>
            <Card>
                <span className='leading-none'>Assets</span>
                <div className='space-x-2 mt-1'>
                    <span className='text-3xl font-semibold'>{formatCurrency(totalAssets)}</span>
                </div>
            </Card>
            {totalDebt > 0 && (
                <Card>
                    <span className='leading-none'>Debt Accounts</span>
                    <div className='space-x-2 mt-1'>
                        <span className='text-3xl font-semibold'>{formatCurrency(totalDebt)}</span>
                    </div>
                </Card>
            )}
            {selectedTerm !== 'All Time' && (
                <>
                    <Card>
                        <span className='leading-none'>{selectedTerm} Deposits</span>
                        <div className='space-x-2 mt-1'>
                            <span className='text-3xl font-semibold text-green-600'>{formatCurrency(periodSaved)}</span>
                        </div>
                    </Card>
                    <Card>
                        <span className='leading-none'>{selectedTerm} Withdrawals</span>
                        <div className='space-x-2 mt-1'>
                            <span className='text-3xl font-semibold text-red-600'>{formatCurrency(periodWithdrawn)}</span>
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
};

export default SavingsSummary;
