import { useEffect, useState } from 'react';
import SaveForm from './components/forms/save-form';
import Page from '@/components/ui/page';
import AccountForm from './components/forms/account-form';
import RecentSaves from './components/cards/recent/recent-saves';
import SavingsAccounts from './components/cards/savings-accounts/savings-accounts';
import DebtAccounts from './components/cards/debt-accounts/debt-accounts';
import ActionButtons from './components/header/action-buttons';
import SavingsSummary from './components/header/summary/savings-summary';
import SavingsAnalysis from './components/cards/analysis/savings-analysis';
import SavingsChart from './components/cards/visualization/savings-chart';
import SavingsPeriodSelector from './components/header/saving-period-selector';
import { Period } from '@/components/ui/period-selector';
import { useFilteredSaves } from './hooks/data/use-filtered-saves';
import AssetForm from './components/forms/asset-form';
import Assets from './components/cards/assets/assets';
import { useReadSaves } from './hooks/supabase/use-saves';
import { useReadSavingsAccounts } from './hooks/supabase/use-savings-accounts';
import { useReadDebtAccounts } from './hooks/supabase/use-debt-accounts';
import { useReadAssets } from './hooks/supabase/use-assets';

const Save = () => {
    const { data: saves } = useReadSaves();
    const { data: savingsAccounts } = useReadSavingsAccounts();
    const { data: debtAccounts } = useReadDebtAccounts();
    const { data: assets } = useReadAssets();

    // Sort accounts and assets by value descending
    const sortedSavingsAccounts = savingsAccounts?.slice().sort((a, b) => b.balance - a.balance) || [];
    const sortedDebtAccounts = debtAccounts?.slice().sort((a, b) => b.current_balance - a.current_balance) || [];
    const sortedAssets = assets?.slice().sort((a, b) => b.value - a.value) || [];

    const [totalSavings, setTotalSavings] = useState(0);
    const [totalAssets, setTotalAssets] = useState(0);
    const [totalDebt, setTotalDebt] = useState(0);
    const [assetFormOpen, setAssetFormOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>();

    useEffect(() => {
        if (savingsAccounts) {
            setTotalSavings(savingsAccounts.reduce((acc, account) => acc + account.balance, 0));
        }
        if (debtAccounts) {
            setTotalDebt(debtAccounts.reduce((acc, account) => acc + account.current_balance, 0));
        }
        if (assets) {
            setTotalAssets(assets.reduce((acc, asset) => acc + asset.value, 0));
        }
    }, [savingsAccounts, debtAccounts, assets]);

    const [saveFormOpen, setSaveFormOpen] = useState(false);
    const [selectedSave, setSelectedSave] = useState<Save | undefined>();

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
        setAssetFormOpen(false);
        setSelectedAsset(undefined);
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
                <ActionButtons onAddAccountClick={handleAccountFormOpen} onNewSaveClick={handleFormOpen} onNewAssetClick={handleNewAsset} />
            </div>

            <SavingsSummary totalSavings={totalSavings} totalDebt={totalDebt} totalAssets={totalAssets} netSavings={totalSavings - totalDebt} periodSaved={totalSaved} periodWithdrawn={totalWithdrawn} selectedTerm={selectedTerm} />

            <div className='grid grid-cols-3 gap-4 flex-1 min-h-0'>
                <div className='grid grid-rows-2 gap-4 min-h-0'>
                    <RecentSaves saves={filteredSaves} onViewSave={handleViewSave} />
                    <Assets assets={sortedAssets} onViewAsset={handleViewAsset} />
                </div>
                <div className='grid grid-rows-2 gap-4 min-h-0'>
                    {debtAccounts && debtAccounts.length > 0 ? (
                        <>
                            <DebtAccounts accounts={sortedDebtAccounts} onViewAccount={handleViewDebtAccount} />
                            <SavingsAccounts accounts={sortedSavingsAccounts} onViewAccount={handleViewSavingsAccount} />
                        </>
                    ) : (
                        <div className='row-span-2'>
                            <SavingsAccounts accounts={sortedSavingsAccounts} onViewAccount={handleViewSavingsAccount} />
                        </div>
                    )}
                </div>
                <div className='grid grid-rows-2 gap-4 min-h-0'>
                    <SavingsChart saves={filteredSaves} savingsAccounts={sortedSavingsAccounts} debtAccounts={sortedDebtAccounts} />
                    <SavingsAnalysis saves={filteredSaves} savingsAccounts={sortedSavingsAccounts} debtAccounts={sortedDebtAccounts} totalSavings={totalSavings} totalDebt={totalDebt} />
                </div>
            </div>

            {saveFormOpen && <SaveForm closeForm={handleFormClose} selectedSave={selectedSave} />}
            {accountFormOpen && <AccountForm closeForm={handleAccountFormClose} selectedAccount={selectedAccount} />}
            {assetFormOpen && <AssetForm closeForm={handleFormClose} selectedAsset={selectedAsset} />}
        </Page>
    );
};

export default Save;
