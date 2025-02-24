import { Suspense } from 'react';
import DisplayCard from '@/features/shared/components/display-card';
import ReactMarkdown from 'react-markdown';
import Loader from '@/components/ui/loader';
import { usePrepareSavingsData } from '../../hooks/analysis/use-prepare-savings-data';
import { useSavingsAnalysis } from '../../hooks/analysis/use-savings-analysis';
import { ErrorBoundary } from 'react-error-boundary';

interface SavingsAnalysisProps {
    saves: Save[] | undefined;
    savingsAccounts: SavingsAccount[] | undefined;
    debtAccounts: DebtAccount[] | undefined;
    totalSavings: number;
    totalDebt: number;
}

const AnalysisContent = ({ savingsData }: { savingsData: any }) => {
    const { data: analysis } = useSavingsAnalysis(savingsData);

    return (
        <div className='flex-1 overflow-y-auto scrollbar-none p-4 pt-0'>
            <div className='prose prose-sm dark:prose-invert max-w-none'>
                <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
        </div>
    );
};

const SavingsAnalysis = (props: SavingsAnalysisProps) => {
    const { saves, savingsAccounts, debtAccounts, totalSavings, totalDebt } = props;
    const { savingsData } = usePrepareSavingsData(saves, savingsAccounts, debtAccounts, totalSavings, totalDebt);

    return (
        <DisplayCard title='Financial Analysis'>
            <ErrorBoundary fallback={<div>Error loading analysis</div>}>
                <Suspense fallback={<Loader />}>{savingsData && <AnalysisContent savingsData={savingsData} />}</Suspense>
            </ErrorBoundary>
        </DisplayCard>
    );
};

export default SavingsAnalysis;
