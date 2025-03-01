import { Suspense } from 'react';
import DisplayCard from '@/components/ui/display-card';
import ReactMarkdown from 'react-markdown';
import Loader from '@/components/ui/loader';
import { usePrepareIncomeData } from '../../hooks/analysis/use-prepare-income-data';
import { useIncomeAnalysis } from '../../hooks/analysis/use-income-analysis';
import { ErrorBoundary } from 'react-error-boundary';

interface IncomeAnalysisProps {
    makes: Make[] | undefined;
}

const NotEnoughData = () => {
    return (
        <div className='flex flex-col items-center justify-center text-center h-full'>
            <div className='text-zinc-600 dark:text-zinc-400 mb-2'>Not enough transactions for analysis</div>
            <div className='text-sm text-zinc-500 dark:text-zinc-500'>Record at least 5 transactions to get AI-powered spending insights</div>
        </div>
    );
};

const AnalysisContent = ({ incomeData }: { incomeData: any }) => {
    const { data: analysis } = useIncomeAnalysis(incomeData);

    return (
        <div className='flex-1 overflow-y-auto scrollbar-none p-4 pt-0'>
            <div className='prose prose-sm dark:prose-invert max-w-none'>
                <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
        </div>
    );
};

const IncomeAnalysis = (props: IncomeAnalysisProps) => {
    const { makes } = props;
    const { incomeData } = usePrepareIncomeData(makes);

    if (!makes || makes.length < 5) {
        return (
            <DisplayCard title='Income Analysis'>
                <NotEnoughData />
            </DisplayCard>
        );
    }

    return (
        <DisplayCard title='Income Analysis'>
            <ErrorBoundary fallback={<div>Error loading analysis</div>}>
                <Suspense fallback={<Loader />}>{incomeData && <AnalysisContent incomeData={incomeData} />}</Suspense>
            </ErrorBoundary>
        </DisplayCard>
    );
};

export default IncomeAnalysis;
