'use client';

import { useState } from 'react';
import Page from '@/components/ui/page';
import MakeForm from './components/forms/make-form';
import SettingsForm from './components/forms/settings-form';
import useFetchMakes from './hooks/use-fetch-makes';
import RecentMakes from './components/recent/recent-makes';
import ActionButtons from './components/header/action-buttons';
import IncomeSummary from './components/summary/income-summary';
import IncomeAnalysis from './components/analysis/income-analysis';
import MakingPeriodSelector from './components/header/making-period-selector';
import { Period } from '@/components/ui/period-selector';
import { useFilteredMakes } from './hooks/use-filtered-makes';
import IncomeChart from './components/visualization/income-chart';
import IncomeSources from './components/sources/income-sources';

const Make = () => {
    const { data: makes } = useFetchMakes();
    const [makeFormOpen, setMakeFormOpen] = useState(false);
    const [settingsFormOpen, setSettingsFormOpen] = useState(false);
    const [selectedMake, setSelectedMake] = useState<Make | undefined>();
    const [selectedTerm, setSelectedTerm] = useState<Period>('All Time');

    const { filteredMakes, totalIncome, incomeBySource } = useFilteredMakes(makes, selectedTerm);

    const handleTermChange = (term: Period) => {
        setSelectedTerm(term);
    };

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
                <MakingPeriodSelector selectedTerm={selectedTerm} onTermChange={handleTermChange} />
                <ActionButtons onSettingsClick={() => setSettingsFormOpen(true)} onNewMakeClick={handleFormOpen} />
            </div>

            <IncomeSummary totalIncome={totalIncome} incomeBySource={incomeBySource} />

            <div className='grid grid-cols-3 gap-4 flex-1 min-h-0'>
                <div className='grid gap-4 min-h-0'>
                    <RecentMakes makes={filteredMakes || []} onViewMake={handleViewMake} />
                </div>
                <div className='grid gap-4 min-h-0'>
                    <IncomeSources incomeBySource={incomeBySource} />
                </div>
                <div className='grid grid-rows-2 gap-4 min-h-0'>
                    <IncomeChart makes={filteredMakes || []} />
                    <IncomeAnalysis makes={filteredMakes || []} />
                </div>
            </div>

            {makeFormOpen && <MakeForm closeForm={handleFormClose} selectedMake={selectedMake} />}
            {settingsFormOpen && <SettingsForm closeForm={handleFormClose} />}
        </Page>
    );
};

export default Make;
