import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import { useState } from 'react';
import { useSavingsAccountMutations } from '../../hooks/savings-accounts/use-savings-account-mutations';
import { useDebtAccountMutations } from '../../hooks/debt-accounts/use-debt-account-mutations';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

type Props = {
    closeForm: () => void;
    selectedAccount?: SavingsAccount | DebtAccount;
};

const FormSchema = z.object({
    type: z.enum(['Savings', 'Debt']),
    name: z.string({
        required_error: 'An account name is required.',
    }),
    balance: z.coerce.number(),
});

// Type guard to check if account is a SavingsAccount
const isSavingsAccount = (account: any): account is SavingsAccount => {
    return 'user_id' in account && !('interest_rate' in account);
};

const AccountForm = ({ closeForm, selectedAccount }: Props) => {
    const { createSavingsAccountMutation, updateSavingsAccountMutation, deleteSavingsAccountMutation } = useSavingsAccountMutations();
    const { createDebtAccountMutation, updateDebtAccountMutation, deleteDebtAccountMutation } = useDebtAccountMutations();

    // Determine initial account type using type guard
    const initialAccountType = selectedAccount ? (isSavingsAccount(selectedAccount) ? 'Savings' : 'Debt') : 'Savings';
    const [accountType, setAccountType] = useState<'Savings' | 'Debt'>(initialAccountType);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const form = useForm({
        defaultValues: {
            type: initialAccountType,
            ...selectedAccount,
        },
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        if (selectedAccount) {
            if (accountType === 'Savings') {
                updateSavingsAccountMutation.mutate({ ...data, id: selectedAccount.id });
            } else {
                updateDebtAccountMutation.mutate({ ...data, id: selectedAccount.id });
            }
        } else {
            if (accountType === 'Savings') {
                createSavingsAccountMutation.mutate(data);
            } else {
                createDebtAccountMutation.mutate(data);
            }
        }
        closeForm();
    };

    const handleDeleteClick = () => {
        setShowDeleteAlert(true);
    };

    const handleConfirmDelete = () => {
        if (selectedAccount) {
            if (accountType === 'Savings') {
                deleteSavingsAccountMutation.mutate(selectedAccount.id);
            } else {
                deleteDebtAccountMutation.mutate(selectedAccount.id);
            }
        }
        closeForm();
    };

    return (
        <>
            <Modal title={selectedAccount ? 'Edit Account' : 'New Account'} closeModal={closeForm} headerStyle='text-black'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <div className='border-orange-0 relative flex w-full overflow-hidden rounded-lg bg-white dark:bg-black'>
                                        <div className={`absolute left-0 top-0 h-full w-1/2 rounded-lg transition-transform duration-200 dark:bg-white ${accountType === 'Debt' ? 'translate-x-full bg-red-600' : 'translate-x-0 bg-green-500'}`}></div>

                                        <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${accountType === 'Savings' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setAccountType('Savings')}>
                                            Savings Account
                                        </div>

                                        <div className={`relative z-10 flex h-10 w-1/2 cursor-pointer items-center justify-center space-x-2 font-medium transition duration-200 ${accountType === 'Debt' ? 'text-white dark:text-black' : 'text-zinc-500'}`} onClick={() => setAccountType('Debt')}>
                                            Debt Account
                                        </div>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Account Name</FormLabel>
                                    <Input className='transition-colors hover:bg-zinc-100' {...field} placeholder='Account Name' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='balance'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Balance</FormLabel>
                                    <Input className='transition-colors hover:bg-zinc-100' type='number' {...field} placeholder='Balance' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className={`flex pt-4 ${selectedAccount ? 'justify-between' : 'justify-end'}`}>
                            {selectedAccount && (
                                <Button type='button' onClick={handleDeleteClick} variant='destructive' size='icon'>
                                    <Trash />
                                </Button>
                            )}
                            <div className='flex space-x-3'>
                                <Button variant='secondary' onClick={closeForm}>
                                    Cancel
                                </Button>
                                <Button type='submit'>Save</Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </Modal>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this account?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the {accountType.toLowerCase()} account "{selectedAccount?.name}" and remove all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} className='bg-red-600 hover:bg-red-700'>
                            Delete Account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default AccountForm;
