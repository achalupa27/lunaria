import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Modal from '@/components/ui/modal';
import { useState } from 'react';
import { useMutateSavingsAccounts } from '../../hooks/supabase/use-savings-accounts';
import { useMutateDebtAccounts } from '../../hooks/supabase/use-debt-accounts';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';
import InputGroup from '@/components/ui/input-groups/input-group';
import SelectGroup from '@/components/ui/input-groups/select-group';

type Props = {
    closeForm: () => void;
    selectedAccount?: SavingsAccount | DebtAccount;
};

const SavingsAccountFormSchema = z.object({
    name: z.string({
        required_error: 'An account name is required.',
    }),
    balance: z.coerce.number(),
    interest_rate: z.coerce.number().optional(),
    interest_period: z.string().optional(),
});

const DebtAccountFormSchema = z.object({
    name: z.string({
        required_error: 'An account name is required.',
    }),
    current_balance: z.coerce.number(),
    initial_balance: z.coerce.number(),
    creditor: z.string(),
    interest_rate: z.coerce.number(),
    interest_period: z.string(),
});

// Type guard to check if account is a SavingsAccount
const isSavingsAccount = (account: SavingsAccount | DebtAccount): account is SavingsAccount => {
    return 'balance' in account && !('creditor' in account);
};

const AccountForm = ({ closeForm, selectedAccount }: Props) => {
    const { create: createSavingsAccount, update: updateSavingsAccount, delete: deleteSavingsAccount } = useMutateSavingsAccounts();
    const { create: createDebtAccount, update: updateDebtAccount, delete: deleteDebtAccount } = useMutateDebtAccounts();

    // Determine initial account type using type guard
    const initialAccountType = selectedAccount ? (isSavingsAccount(selectedAccount) ? 'Savings' : 'Debt') : 'Savings';
    const [accountType, setAccountType] = useState<'Savings' | 'Debt'>(initialAccountType);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    // Create separate forms for each account type
    const savingsForm = useForm({
        defaultValues: isSavingsAccount(selectedAccount || {})
            ? selectedAccount
            : {
                  name: '',
                  balance: 0,
                  interest_rate: 0,
                  interest_period: 'Monthly',
              },
        resolver: zodResolver(SavingsAccountFormSchema),
    });

    const debtForm = useForm({
        defaultValues:
            !isSavingsAccount(selectedAccount || {}) && selectedAccount
                ? selectedAccount
                : {
                      name: '',
                      current_balance: 0,
                      initial_balance: 0,
                      creditor: '',
                      interest_rate: 0,
                  },
        resolver: zodResolver(DebtAccountFormSchema),
    });

    const handleSavingsSubmit: SubmitHandler<z.infer<typeof SavingsAccountFormSchema>> = (data) => {
        if (selectedAccount && isSavingsAccount(selectedAccount)) updateSavingsAccount({ ...data, id: selectedAccount.id });
        else createSavingsAccount(data);

        closeForm();
    };

    const handleDebtSubmit: SubmitHandler<z.infer<typeof DebtAccountFormSchema>> = (data) => {
        if (selectedAccount && !isSavingsAccount(selectedAccount)) updateDebtAccount({ ...data, id: selectedAccount.id });
        else createDebtAccount(data);

        closeForm();
    };

    const deleteMessage = `This action cannot be undone. This will permanently delete the ${accountType.toLowerCase()} account "${selectedAccount?.name}" and remove all associated data.`;

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

    // Switch account type - reset form if creating new account
    const switchAccountType = (type: 'Savings' | 'Debt') => {
        setAccountType(type);
        if (!selectedAccount) {
            if (type === 'Savings') {
                savingsForm.reset({
                    name: '',
                    balance: 0,
                    interest_rate: 0,
                    interest_period: 'Monthly',
                });
            } else {
                debtForm.reset({
                    name: '',
                    current_balance: 0,
                    initial_balance: 0,
                    creditor: '',
                    interest_rate: 0,
                    interest_period: 'Monthly',
                });
            }
        }
    };

    const interestPeriods = ['Daily', 'Monthly', 'Quarterly', 'Annually'];

    return (
        <>
            <Modal title={selectedAccount ? 'Edit Account' : 'New Account'} closeModal={closeForm} headerStyle='text-black'>
                <div className='border-orange-0 relative flex w-full overflow-hidden rounded-lg bg-white dark:bg-black mb-4'>
                    <div className={`absolute left-0 top-0 h-full w-1/2 rounded-lg transition-transform duration-200 dark:bg-white ${accountType === 'Debt' ? 'translate-x-full bg-red-600' : 'translate-x-0 bg-green-500'}`}></div>

                    <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${accountType === 'Savings' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => switchAccountType('Savings')}>
                        Savings Account
                    </div>

                    <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${accountType === 'Debt' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => switchAccountType('Debt')}>
                        Debt Account
                    </div>
                </div>

                {accountType === 'Savings' ? (
                    <Form {...savingsForm}>
                        <form onSubmit={savingsForm.handleSubmit(handleSavingsSubmit)} className='space-y-4'>
                            <InputGroup control={savingsForm.control} name='name' label='Account Name' placeholder='Account Name' />
                            <InputGroup control={savingsForm.control} name='balance' label='Balance' placeholder='0.00' type='number' step='0.01' />
                            <InputGroup control={savingsForm.control} name='interest_rate' label='Interest Rate (%)' placeholder='0.00' type='number' step='0.01' />
                            <SelectGroup control={savingsForm.control} name='interest_period' label='Interest Period' placeholder='Select period' options={interestPeriods} />

                            <FormActions onDelete={selectedAccount ? handleDeleteClick : undefined} onCancel={closeForm} showDelete={!!selectedAccount} />
                        </form>
                    </Form>
                ) : (
                    <Form {...debtForm}>
                        <form onSubmit={debtForm.handleSubmit(handleDebtSubmit)} className='space-y-4'>
                            <InputGroup control={debtForm.control} name='name' label='Account Name' placeholder='Account Name' />
                            <InputGroup control={debtForm.control} name='initial_balance' label='Initial Balance' placeholder='0.00' type='number' step='0.01' />
                            <InputGroup control={debtForm.control} name='current_balance' label='Current Balance' placeholder='0.00' type='number' step='0.01' />
                            <InputGroup control={debtForm.control} name='creditor' label='Creditor' placeholder='Creditor Name' />
                            <InputGroup control={debtForm.control} name='interest_rate' label='Interest Rate (%)' placeholder='0.00' type='number' step='0.01' />
                            <SelectGroup control={debtForm.control} name='interest_period' label='Interest Period' placeholder='Select period' options={interestPeriods} />

                            <FormActions onDelete={selectedAccount ? handleDeleteClick : undefined} onCancel={closeForm} showDelete={!!selectedAccount} />
                        </form>
                    </Form>
                )}
            </Modal>

            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} deleteMessage={deleteMessage} handleConfirmDelete={handleConfirmDelete} />
        </>
    );
};

export default AccountForm;
