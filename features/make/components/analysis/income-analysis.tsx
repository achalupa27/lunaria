import { Suspense } from 'react';
import DisplayCard from '@/features/shared/components/display-card';
import ReactMarkdown from 'react-markdown';
import Loader from '@/components/ui/loader';
import { usePrepareIncomeData } from '../../hooks/analysis/use-prepare-income-data';
import { useIncomeAnalysis } from '../../hooks/analysis/use-income-analysis';
import { ErrorBoundary } from 'react-error-boundary';

interface IncomeAnalysisProps {
    makes: Make[] | undefined;
}

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

    return (
        <DisplayCard title='Income Analysis'>
            <ErrorBoundary fallback={<div>Error loading analysis</div>}>
                <Suspense fallback={<Loader />}>{incomeData && <AnalysisContent incomeData={incomeData} />}</Suspense>
            </ErrorBoundary>
        </DisplayCard>
    );
};

export default IncomeAnalysis;
