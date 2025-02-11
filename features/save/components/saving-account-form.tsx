import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSavingsAccountMutations } from '../hooks/use-savings-account-mutations';
import { useAppSelector } from '@/redux/hooks';

type Props = {
    closeForm: any;
    selectedSavingsAccount?: SavingsAccount;
};

const FormSchema = z.object({
    name: z.string({
        required_error: 'An account name is required.',
    }),
    balance: z.coerce.number(),
});

const SavingAccountForm = ({ closeForm, selectedSavingsAccount }: Props) => {
    const { createSavingsAccountMutation, updateSavingsAccountMutation, deleteSavingsAccountMutation } = useSavingsAccountMutations();

    const form = useForm({
        defaultValues: selectedSavingsAccount,
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        console.log('savingsAccount: ', data);
        if (true) {
            if (selectedSavingsAccount) {
                const updatedSavingsAccount: SavingsAccount = {
                    ...data,
                    id: selectedSavingsAccount.id,
                };

                updateSavingsAccountMutation.mutate(updatedSavingsAccount);
            } else {
                const newSavingsAccount: Omit<SavingsAccount, 'id'> = {
                    ...data,
                };

                createSavingsAccountMutation.mutate(newSavingsAccount);
            }
        } else {
            console.error('[ERROR] Could not add savings account. [REASON] No user.');
        }
        closeForm();
    };

    const handleDelete = () => {
        selectedSavingsAccount && deleteSavingsAccountMutation.mutate(selectedSavingsAccount.id);
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
                <div className={`flex pt-4 ${selectedSavingsAccount ? 'justify-between' : 'justify-end'}`}>
                    {selectedSavingsAccount && (
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

export default SavingAccountForm;
