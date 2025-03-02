import { Suspense } from 'react';
import DisplayCard from '@/components/ui/display-card';
import ReactMarkdown from 'react-markdown';
import Loader from '@/components/ui/loader';
import { usePrepareSavingsData } from '../../hooks/openai/use-prepare-savings-data';
import { useSavingsAnalysis } from '../../hooks/openai/use-savings-analysis';
import { ErrorBoundary } from 'react-error-boundary';

interface SavingsAnalysisProps {
    saves: Save[] | undefined;
    savingsAccounts: SavingsAccount[] | undefined;
    debtAccounts: DebtAccount[] | undefined;
    totalSavings: number;
    totalDebt: number;
}

const NotEnoughData = () => {
    return (
        <div className='flex flex-col items-center justify-center text-center h-full'>
            <div className='text-zinc-600 dark:text-zinc-400 mb-2'>Not enough transactions for analysis</div>
            <div className='text-sm text-zinc-500 dark:text-zinc-500'>Record at least 5 transactions to get AI-powered spending insights</div>
        </div>
    );
};

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

    if (!saves || saves.length < 5) {
        return (
            <DisplayCard title='Financial Analysis'>
                <NotEnoughData />
            </DisplayCard>
        );
    }

    return (
        <DisplayCard title='Financial Analysis'>
            <ErrorBoundary fallback={<div>Error loading analysis</div>}>
                <Suspense fallback={<Loader />}>{savingsData && <AnalysisContent savingsData={savingsData} />}</Suspense>
            </ErrorBoundary>
        </DisplayCard>
    );
};

export default SavingsAnalysis;
