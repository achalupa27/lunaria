import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useMutateAssets } from '../../hooks/supabase/use-assets';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';

type Props = {
    closeForm: () => void;
    selectedAsset?: Asset;
};

const categories = ['Real Estate', 'Vehicles', 'Collectibles', 'Jewelry', 'Art', 'Business Equipment', 'Other'] as const;
const liquidityLevels = ['High', 'Medium', 'Low'] as const;

const FormSchema = z.object({
    name: z.string({
        required_error: 'Asset name is required.',
    }),
    value: z.coerce.number({
        required_error: 'Asset value is required.',
    }),
    category: z.enum(categories, {
        required_error: 'Category is required.',
    }),
    liquidity: z.enum(liquidityLevels, {
        required_error: 'Liquidity level is required.',
    }),
    appreciation_rate: z.coerce.number().default(0),
});

const AssetForm = ({ closeForm, selectedAsset }: Props) => {
    const { create: createAsset, update: updateAsset, delete: deleteAsset } = useMutateAssets();
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const form = useForm({
        defaultValues: selectedAsset,
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        if (selectedAsset) {
            updateAsset({
                ...data,
                id: selectedAsset.id,
            });
        } else createAsset(data);

        closeForm();
    };

    const handleDeleteClick = () => {
        setShowDeleteAlert(true);
    };

    const handleConfirmDelete = () => {
        if (selectedAsset) deleteAsset(selectedAsset.id);
        closeForm();
    };

    const deleteMessage = `This action cannot be undone. This will permanently delete the asset "${selectedAsset?.name}" and remove all associated data.`;

    return (
        <>
            <Modal title={selectedAsset ? 'Edit Asset' : 'New Asset'} closeModal={closeForm} headerStyle='text-black'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Asset Name</FormLabel>
                                    <Input {...field} placeholder='Asset Name' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='value'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Value</FormLabel>
                                    <Input type='number' {...field} placeholder='Value' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='category'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Category</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select category' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='liquidity'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Liquidity</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select liquidity' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {liquidityLevels.map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='appreciation_rate'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Annual Appreciation Rate (%)</FormLabel>
                                    <Input type='number' step='0.01' {...field} placeholder='0.00' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormActions onDelete={handleDeleteClick} onCancel={closeForm} showDelete={!!selectedAsset} />
                    </form>
                </Form>
            </Modal>

            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} deleteMessage={deleteMessage} handleConfirmDelete={handleConfirmDelete} />
        </>
    );
};

export default AssetForm;
