import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSavingsAccountMutations } from '../hooks/use-savings-account-mutations';
import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/slices/userSlice';

type Props = {
    closeForm: any;
    selectedSavingsAccount?: Save;
};

const FormSchema = z.object({
    account: z.string({
        required_error: 'An account is required.',
    }),
    balance: z.coerce.number(),
});

const SavingAccountForm = ({ closeForm, selectedSavingsAccount }: Props) => {
    const user = useAppSelector(selectUser);
    const { createSavingsAccountMutation, updateSavingsAccountMutation, deleteSavingsAccountMutation } = useSavingsAccountMutations();

    const form = useForm({
        defaultValues: {},
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        console.log('save: ', data);
        if (user) {
            if (selectedSavingsAccount) {
                const updatedSavingsAccount: SavingsAccount = {
                    ...data,
                    user_email: user!.email,
                    id: selectedSavingsAccount.id,
                };

                updateSavingsAccountMutation.mutate(updatedSavingsAccount);
            } else {
                const newSavingsAccount: Omit<SavingsAccount, 'id'> = {
                    ...data,
                    user_email: user!.email,
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
                    name='account'
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
                <div className={`flex pt-4 ${true ? 'justify-between' : 'justify-end'}`}>
                    {true && (
                        <Button type='button' onClick={() => {}} variant='destructive' size='icon'>
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
