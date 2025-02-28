import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useDebtAccountMutations } from '../hooks/use-debt-account-mutations';

type Props = {
    closeForm: any;
    selectedDebtAccount?: DebtAccount;
};

const FormSchema = z.object({
    name: z.string({
        required_error: 'An account name is required.',
    }),
    balance: z.coerce.number(),
});

const DebtAccountForm = ({ closeForm, selectedDebtAccount }: Props) => {
    const { createDebtAccountMutation, updateDebtAccountMutation, deleteDebtAccountMutation } = useDebtAccountMutations();

    const form = useForm({
        defaultValues: selectedDebtAccount,
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        console.log('formData: ', data);
        if (true) {
            if (selectedDebtAccount) {
                const updatedSavingsAccount: SavingsAccount = {
                    ...data,
                    id: selectedDebtAccount.id,
                };

                updateDebtAccountMutation.mutate(updatedSavingsAccount);
            } else {
                const newSavingsAccount: Omit<DebtAccount, 'id'> = {
                    ...data,
                };

                createDebtAccountMutation.mutate(newSavingsAccount);
            }
        } else {
            console.error('[ERROR] Could not add debt account. [REASON] No user.');
        }
        closeForm();
    };

    const handleDelete = () => {
        selectedDebtAccount && deleteDebtAccountMutation.mutate(selectedDebtAccount.id);
        closeForm();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                <div className={`flex pt-4 ${selectedDebtAccount ? 'justify-between' : 'justify-end'}`}>
                    {selectedDebtAccount && (
                        <Button type='button' onClick={handleDelete} variant='destructive' size='icon'>
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
    );
};

export default DebtAccountForm;
