import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { useEffect, useState } from 'react';
import SavingAccountForm from './saving-account-form';
import DebtAccountForm from './debt-account-form';
import useFetchDebtAccounts from '../hooks/use-fetch-debt-accounts';
import useFetchSavingsAccounts from '../hooks/use-fetch-savings-accounts';

type Props = {
    closeForm: any;
    selectedSave?: Save;
};

const SettingsForm = ({ closeForm }: Props) => {
    const { data: savingsAccounts } = useFetchSavingsAccounts();
    const { data: debtAccounts } = useFetchDebtAccounts();

    const [showSavingsAccountForm, setShowSavingsAccountForm] = useState(false);
    const [showDebtAccountForm, setShowDebtAccountForm] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<SavingsAccount | DebtAccount | undefined>();

    const handleBack = () => {
        if (showSavingsAccountForm) setShowSavingsAccountForm(false);
        if (showDebtAccountForm) setShowDebtAccountForm(false);
        setSelectedAccount(undefined);
    };

    const [title, setTitle] = useState('Settings');
    useEffect(() => {
        const mode = selectedAccount ? 'Edit' : 'New';
        if (showSavingsAccountForm) setTitle(mode + ' Savings Account');
        else if (showDebtAccountForm) setTitle(mode + ' Debt Account');
        else setTitle('Settings');
    }, [showSavingsAccountForm, showDebtAccountForm, selectedAccount]);

    const handleEditSavingsAccount = (account: SavingsAccount) => {
        setShowSavingsAccountForm(true);
        setSelectedAccount(account);
    };

    const handleEditDebtAccount = (account: DebtAccount) => {
        setShowDebtAccountForm(true);
        setSelectedAccount(account);
    };

    return (
        <Modal title={title} handleBack={showSavingsAccountForm || showDebtAccountForm ? handleBack : undefined} closeModal={closeForm} headerStyle={'text-black'}>
            {!showSavingsAccountForm && !showDebtAccountForm && (
                <div>
                    <div>
                        <div className='flex items-center justify-between pb-2'>
                            <div className='text-lg font-medium'>Savings Accounts</div>
                            <Button variant='secondary' className='text-base' onClick={() => setShowSavingsAccountForm(true)}>
                                + New Savings Account
                            </Button>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {savingsAccounts?.length === 0 ? (
                                <div className='flex flex-col items-center justify-center text-center text-gray-500'>
                                    <div>No savings accounts created.</div>
                                </div>
                            ) : (
                                savingsAccounts?.map((account) => (
                                    <div key={account.id} className='flex justify-between' onClick={() => handleEditSavingsAccount(account)}>
                                        <div>{account.name}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                    <div className='mt-8 border-t pt-4'>
                        <div className='flex items-center justify-between pb-2'>
                            <div className='text-lg font-medium'>Debt Accounts</div>
                            <Button variant='secondary' className='text-base' onClick={() => setShowDebtAccountForm(true)}>
                                + New Debt Account
                            </Button>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {debtAccounts?.length === 0 ? (
                                <div className='flex flex-col items-center justify-center text-center text-gray-500'>
                                    <div>No debt accounts created.</div>
                                </div>
                            ) : (
                                debtAccounts?.map((account) => (
                                    <div key={account.id} className='flex justify-between' onClick={() => handleEditDebtAccount(account)}>
                                        <div>{account.name}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
            {showSavingsAccountForm && <SavingAccountForm closeForm={handleBack} selectedSavingsAccount={selectedAccount} />}
            {showDebtAccountForm && <DebtAccountForm closeForm={handleBack} selectedDebtAccount={selectedAccount} />}
        </Modal>
    );
};

export default SettingsForm;
