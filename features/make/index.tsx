import { useEffect, useState, useRef } from 'react';
import { useMakeColumns } from '@/hooks/use-make-columns';
import { formatCurrency } from '@/utils/helper';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import MakeForm from './components/make-form';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings } from 'lucide-react';
import SettingsForm from './components/settings-form';
import useFetchMakes from './hooks/use-fetch-makes';
import RecentMakes from './components/recent-makes';
import ActionButtons from './components/header/action-buttons';
import IncomeSummary from './components/summary/income-summary';
import IncomeAnalysis, { IncomeAnalysisRef } from './components/analysis/income-analysis';

const Make = () => {
    const { data: makes } = useFetchMakes();
    const makeColumns = useMakeColumns();
    const [makeFormOpen, setMakeFormOpen] = useState(false);
    const [settingsFormOpen, setSettingsFormOpen] = useState(false);
    const [selectedMake, setSelectedMake] = useState<Make | undefined>();
    const analysisRef = useRef<IncomeAnalysisRef>(null);

    const [incomeBySource, setIncomeBySource] = useState<Record<string, number>>({});
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        if (makes) {
            const sourceGroups = makes.reduce(
                (acc, make) => {
                    if (!acc[make.source]) acc[make.source] = 0;
                    acc[make.source] += make.amount;
                    return acc;
                },
                {} as Record<string, number>
            );
            setIncomeBySource(sourceGroups);
            setTotalIncome(makes.reduce((sum, make) => sum + make.amount, 0));
        }
    }, [makes]);

    const handleViewMake = (row: any) => {
        setSelectedMake(row);
        setMakeFormOpen(true);
    };

    const handleFormOpen = () => {
        setSelectedMake(undefined);
        setMakeFormOpen(true);
    };

    const handleFormClose = () => {
        setSelectedMake(undefined);
        setMakeFormOpen(false);
        setSettingsFormOpen(false);
    };

    return (
        <Page>
            <div className='flex items-center justify-between'>
                <div className='-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800'>
                    <span>Making - All Time</span>
                    <ChevronDown />
                </div>
                <ActionButtons onSettingsClick={() => setSettingsFormOpen(true)} onAnalyzeClick={() => analysisRef.current?.analyze()} onNewMakeClick={handleFormOpen} />
            </div>

            <IncomeSummary totalIncome={totalIncome} incomeBySource={incomeBySource} />

            <div className='grid grid-cols-2 gap-4 h-full overflow-hidden'>
                <div className='space-y-4'>
                    <RecentMakes makes={makes || []} onViewMake={handleViewMake} />
                </div>
                <div className='space-y-4'>
                    <IncomeAnalysis ref={analysisRef} makes={makes || []} />
                </div>
            </div>

            {makeFormOpen && <MakeForm closeForm={handleFormClose} selectedMake={selectedMake} />}
            {settingsFormOpen && <SettingsForm closeForm={handleFormClose} />}
        </Page>
    );
};

export default Make;
