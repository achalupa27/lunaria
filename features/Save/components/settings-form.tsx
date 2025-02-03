import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/modal';
import { useEffect, useState } from 'react';
import SavingAccountForm from './saving-account-form';
import DebtAccountForm from './debt-account-form';

type Props = {
    closeForm: any;
    selectedSave?: Save;
};

const debtAccounts: DebtAccount[] = [
    { id: '1', name: 'Credit Card 1', balance: -1200.5 },
    { id: '2', name: 'Credit Card 2', balance: -500.75 },
    { id: '3', name: 'Car Loan', balance: -15000.0 },
    { id: '4', name: 'Personal Loan', balance: -3000.0 },
    { id: '5', name: 'Student Loan', balance: -20000.0 },
    { id: '6', name: 'Mortgage', balance: -120000.0 },
    { id: '7', name: 'Medical Debt', balance: -2500.0 },
    { id: '8', name: 'Business Loan', balance: -8000.0 },
];

const savingsAccounts: SavingsAccount[] = [
    { id: '1', name: 'Primary Savings', balance: 1500.75 },
    { id: '2', name: 'Emergency Fund', balance: 5000.0 },
    { id: '3', name: 'Vacation Fund', balance: 2500.5 },
    { id: '4', name: 'Business Savings', balance: 12000.0 },
    { id: '5', name: 'High-Yield Savings', balance: 800.25 },
    { id: '6', name: 'Education Fund', balance: 3200.9 },
    { id: '7', name: 'Retirement Fund', balance: 15000.0 },
    { id: '8', name: 'Health Savings', balance: 1000.0 },
];

const SettingsForm = ({ closeForm }: Props) => {
    const [showSavingsAccountForm, setShowSavingsAccountForm] = useState(false);
    const [showDebtAccountForm, setShowDebtAccountForm] = useState(false);

    const handleBack = () => {
        if (showSavingsAccountForm) setShowSavingsAccountForm(false);
        if (showDebtAccountForm) setShowDebtAccountForm(false);
    };

    const [title, setTitle] = useState('Settings');
    useEffect(() => {
        if (showSavingsAccountForm) setTitle('New Savings Account');
        else if (showDebtAccountForm) setTitle('New Debt Account');
        else setTitle('Settings');
    }, [showSavingsAccountForm, showDebtAccountForm]);

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
                            {savingsAccounts.map((account) => (
                                <div key={account.id} className='rounded-lg border px-2 py-1'>
                                    {account.name}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='flex items-center justify-between pb-2'>
                            <div className='text-lg font-medium'>Debt Accounts</div>
                            <Button variant='secondary' className='text-base' onClick={() => setShowDebtAccountForm(true)}>
                                + New Debt Account
                            </Button>
                        </div>
                        <div className='flex flex-wrap gap-2'>
                            {debtAccounts.map((account) => (
                                <div key={account.id} className='rounded-lg border px-2 py-1'>
                                    {account.name}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {showSavingsAccountForm && <SavingAccountForm closeForm={() => {}} />}
            {showDebtAccountForm && <DebtAccountForm closeForm={() => {}} />}
        </Modal>
    );
};

export default SettingsForm;
