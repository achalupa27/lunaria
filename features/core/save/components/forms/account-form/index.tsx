import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Modal from '@/components/ui/modal';
import { useState } from 'react';
import { useMutateSavingsAccounts } from '../../../hooks/supabase/use-savings-accounts';
import { useMutateDebtAccounts } from '../../../hooks/supabase/use-debt-accounts';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';
import AccountTypeToggle from './account-type-toggle';
import SavingsAccountFields from './savings-account-fields';
import DebtAccountFields from './debt-account-fields';
import { DebtAccountFormSchema, SavingsAccountFormSchema } from './schema';

type SavingsAccountFormValues = z.infer<typeof SavingsAccountFormSchema>;
type DebtAccountFormValues = z.infer<typeof DebtAccountFormSchema>;
type Props = {
    closeForm: () => void;
    selectedAccount?: SavingsAccount | DebtAccount;
};

const isSavingsAccount = (account: SavingsAccount | DebtAccount | {}): account is SavingsAccount => {
    if (Object.keys(account).length === 0) return false;
    return 'balance' in account && !('creditor' in account);
};

const AccountForm = ({ closeForm, selectedAccount }: Props) => {
    const initialAccountType = selectedAccount ? (isSavingsAccount(selectedAccount) ? 'Savings' : 'Debt') : 'Savings';
    const [accountType, setAccountType] = useState<'Savings' | 'Debt'>(initialAccountType);

    const { create: createSavingsAccount, update: updateSavingsAccount, delete: deleteSavingsAccount } = useMutateSavingsAccounts();
    const { create: createDebtAccount, update: updateDebtAccount, delete: deleteDebtAccount } = useMutateDebtAccounts();

    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const savingsForm = useForm<SavingsAccountFormValues>({
        defaultValues: selectedAccount,
        resolver: zodResolver(SavingsAccountFormSchema),
    });

    const debtForm = useForm<DebtAccountFormValues>({
        defaultValues: selectedAccount,
        resolver: zodResolver(DebtAccountFormSchema),
    });

    const handleSavingsSubmit: SubmitHandler<SavingsAccountFormValues> = (data: SavingsAccountFormValues) => {
        if (selectedAccount) updateSavingsAccount({ ...data, id: selectedAccount.id });
        else createSavingsAccount(data);

        closeForm();
    };

    const handleDebtSubmit: SubmitHandler<DebtAccountFormValues> = (data: DebtAccountFormValues) => {
        if (selectedAccount) updateDebtAccount({ ...data, id: selectedAccount.id });
        else createDebtAccount(data);

        closeForm();
    };

    const switchAccountType = (type: 'Savings' | 'Debt') => {
        setAccountType(type);
        if (!selectedAccount) {
            if (type === 'Savings') savingsForm.reset();
            else debtForm.reset();
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteAlert(true);
    };

    const handleConfirmDelete = () => {
        if (selectedAccount) {
            if (isSavingsAccount(selectedAccount)) deleteSavingsAccount(selectedAccount.id);
            else deleteDebtAccount(selectedAccount.id);
        }
        closeForm();
    };

    return (
        <Modal title={selectedAccount ? `Edit ${accountType} Account` : `New ${accountType} Account`} closeModal={closeForm}>
            {!selectedAccount && <AccountTypeToggle accountType={accountType} setAccountType={switchAccountType} />}

            {accountType === 'Savings' ? (
                <Form {...savingsForm}>
                    <form onSubmit={savingsForm.handleSubmit(handleSavingsSubmit)} className='space-y-4'>
                        <SavingsAccountFields control={savingsForm.control} />
                        <FormActions onDelete={selectedAccount ? handleDeleteClick : undefined} onCancel={closeForm} showDelete={!!selectedAccount} />
                    </form>
                </Form>
            ) : (
                <Form {...debtForm}>
                    <form onSubmit={debtForm.handleSubmit(handleDebtSubmit)} className='space-y-4'>
                        <DebtAccountFields control={debtForm.control} />
                        <FormActions onDelete={selectedAccount ? handleDeleteClick : undefined} onCancel={closeForm} showDelete={!!selectedAccount} />
                    </form>
                </Form>
            )}
            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} handleConfirmDelete={handleConfirmDelete} itemCategory='account' itemName={selectedAccount?.name || ''} />
        </Modal>
    );
};

export default AccountForm;
