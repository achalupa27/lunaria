import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import Modal from '@/components/ui/modal';
import { useState } from 'react';
import { useMutateAssets } from '../../hooks/supabase/use-assets';
import FormActions from '@/components/ui/form-actions';
import ConfirmDelete from '@/components/ui/confirm-delete';
import InputGroup from '@/components/ui/input-groups/input-group';
import SelectGroup from '@/components/ui/input-groups/select-group';
import { createSchemaFromType } from '@/utils/zod';

type Props = {
    closeForm: () => void;
    selectedAsset?: Asset;
};

const categories = ['Real Estate', 'Vehicles', 'Collectibles', 'Jewelry', 'Art', 'Business Equipment', 'Other'] as const;
const liquidityLevels = ['High', 'Medium', 'Low'] as const;

const FormSchema = createSchemaFromType<AssetCreate>({
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
    appreciation_rate: z.coerce.number(),
});

type FormValues = z.infer<typeof FormSchema>;

const AssetForm = ({ closeForm, selectedAsset }: Props) => {
    const { create: createAsset, update: updateAsset, delete: deleteAsset } = useMutateAssets();
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const form = useForm({
        defaultValues: selectedAsset,
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
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
                        <InputGroup control={form.control} name='name' label='Asset Name' placeholder='Asset Name' />
                        <InputGroup control={form.control} name='value' label='Value' placeholder='Value' type='number' step='0.01' />
                        <SelectGroup control={form.control} name='category' label='Category' placeholder='Select category' options={categories} />
                        <SelectGroup control={form.control} name='liquidity' label='Liquidity' placeholder='Select liquidity' options={liquidityLevels} />
                        <InputGroup control={form.control} name='appreciation_rate' label='Annual Appreciation Rate (%)' placeholder='0.00' type='number' step='0.01' />

                        <FormActions onDelete={handleDeleteClick} onCancel={closeForm} showDelete={!!selectedAsset} />
                    </form>
                </Form>
            </Modal>

            <ConfirmDelete showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} deleteMessage={deleteMessage} handleConfirmDelete={handleConfirmDelete} />
        </>
    );
};

export default AssetForm;
