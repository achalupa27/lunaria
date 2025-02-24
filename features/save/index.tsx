import { useEffect, useState, useRef } from 'react';
import { useSaveColumns } from '@/hooks/use-save-columns';
import { formatCurrency } from '@/utils/helper';
import SaveForm from './components/forms/save-form';
import Table from '@/components/ui/table';
import Page from '@/components/ui/page';
import Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings, PlusCircle, Plus } from 'lucide-react';
import useFetchSaves from './hooks/use-fetch-saves';
import { useTable } from '@/hooks/use-table';
import SettingsForm from './components/forms/settings-form';
import useFetchSavingsAccounts from './hooks/use-fetch-savings-accounts';
import useFetchDebtAccounts from './hooks/use-fetch-debt-accounts';
import AccountForm from './components/forms/account-form';
import RecentSaves from './components/recent-saves';
import SavingsAccounts from './components/accounts/savings-accounts';
import DebtAccounts from './components/accounts/debt-accounts';
import ActionButtons from './components/header/action-buttons';
import SavingsSummary from './components/summary/savings-summary';
import SavingsAnalysis, { SavingsAnalysisRef } from './components/analysis/savings-analysis';
import SavingsChart from './components/visualization/savings-chart';
import SavingsPeriodSelector from './components/header/saving-period-selector';
import { Period } from '@/features/shared/components/period-selector';
import { useFilteredSaves } from './hooks/use-filtered-saves';
import AssetForm from './components/forms/asset-form';
import Assets from './components/accounts/assets';
import useFetchAssets from './hooks/use-fetch-assets';

const Save = () => {
    const { data: saves } = useFetchSaves();
    const { data: savingsAccounts } = useFetchSavingsAccounts();
    const { data: debtAccounts } = useFetchDebtAccounts();
    const { data: assets } = useFetchAssets();

    const [totalSavings, setTotalSavings] = useState(0);
    const [totalDebt, setTotalDebt] = useState(0);
    const [assetFormOpen, setAssetFormOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>();

    useEffect(() => {
        if (savingsAccounts) {
            setTotalSavings(savingsAccounts.reduce((acc, account) => acc + account.balance, 0));
        }
        if (debtAccounts) {
            setTotalDebt(debtAccounts.reduce((acc, account) => acc + account.balance, 0));
        }
    }, [savingsAccounts, debtAccounts]);

    const saveColumns = useSaveColumns();
    const [saveFormOpen, setSaveFormOpen] = useState(false);
    const [settingsFormOpen, setSettingsFormOpen] = useState(false);
    const [selectedSave, setSelectedSave] = useState<Save | undefined>();

    const { table } = useTable({ data: saves || [], columns: saveColumns });

    const handleViewSave = (row: any) => {
        setSelectedSave(row);
        setSaveFormOpen(true);
    };

    const handleFormOpen = () => {
        setSelectedSave(undefined);
        setSaveFormOpen(true);
    };

    const handleFormClose = () => {
        setSelectedSave(undefined);
        setSaveFormOpen(false);
        setSettingsFormOpen(false);
        setAssetFormOpen(false);
        setSelectedAsset(undefined);
    };

    const analysisRef = useRef<SavingsAnalysisRef>(null);

    const handleAnalysis = () => {
        analysisRef.current?.analyze();
    };

    const [accountFormOpen, setAccountFormOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<SavingsAccount | DebtAccount | undefined>();

    const handleAccountFormOpen = () => {
        setSelectedAccount(undefined);
        setAccountFormOpen(true);
    };

    const handleAccountFormClose = () => {
        setSelectedAccount(undefined);
        setAccountFormOpen(false);
    };

    const handleEditAccount = (account: SavingsAccount | DebtAccount) => {
        setSelectedAccount(account);
        setAccountFormOpen(true);
    };

    const handleViewSavingsAccount = (account: SavingsAccount) => {
        handleEditAccount(account);
    };

    const handleViewDebtAccount = (account: DebtAccount) => {
        handleEditAccount(account);
    };

    const [selectedTerm, setSelectedTerm] = useState<Period>('All Time');

    const handleTermChange = (term: Period) => {
        setSelectedTerm(term);
    };

    const { filteredSaves, totalSaved, totalWithdrawn } = useFilteredSaves(saves, selectedTerm);

    const handleNewAsset = () => {
        setSelectedAsset(undefined);
        setAssetFormOpen(true);
    };

    const handleViewAsset = (asset: Asset) => {
        setSelectedAsset(asset);
        setAssetFormOpen(true);
    };

    return (
        <Page>
            <div className='flex items-center justify-between'>
                <SavingsPeriodSelector selectedTerm={selectedTerm} onTermChange={handleTermChange} />
                <ActionButtons onSettingsClick={() => setSettingsFormOpen(true)} onAnalyzeClick={handleAnalysis} onAddAccountClick={handleAccountFormOpen} onNewSaveClick={handleFormOpen} onNewAssetClick={handleNewAsset} />
            </div>

            <SavingsSummary totalSavings={totalSavings} totalDebt={totalDebt} netSavings={totalSavings - totalDebt} periodSaved={totalSaved} periodWithdrawn={totalWithdrawn} selectedTerm={selectedTerm} />

            <div className='grid grid-cols-3 gap-4 h-full overflow-hidden'>
                <div className='space-y-4'>
                    <SavingsAccounts accounts={savingsAccounts || []} onViewAccount={handleViewSavingsAccount} />
                    <DebtAccounts accounts={debtAccounts || []} onViewAccount={handleViewDebtAccount} />
                    <Assets assets={assets || []} onViewAsset={handleViewAsset} />
                </div>
                <div className='space-y-4'>
                    <SavingsChart saves={filteredSaves} savingsAccounts={savingsAccounts || []} debtAccounts={debtAccounts || []} />
                    <RecentSaves saves={filteredSaves} onViewSave={handleViewSave} />
                </div>
                <div className='space-y-4'>
                    <SavingsAnalysis ref={analysisRef} saves={filteredSaves} savingsAccounts={savingsAccounts || []} debtAccounts={debtAccounts || []} totalSavings={totalSavings} totalDebt={totalDebt} />
                </div>
            </div>

            {saveFormOpen && <SaveForm closeForm={handleFormClose} selectedSave={selectedSave} />}
            {settingsFormOpen && <SettingsForm closeForm={handleFormClose} />}
            {accountFormOpen && <AccountForm closeForm={handleAccountFormClose} selectedAccount={selectedAccount} />}
            {assetFormOpen && <AssetForm closeForm={handleFormClose} selectedAsset={selectedAsset} />}
        </Page>
    );
};

export default Save;
