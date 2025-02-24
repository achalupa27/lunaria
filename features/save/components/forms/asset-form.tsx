import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { useAssetMutations } from '../../hooks/use-asset-mutations';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type Props = {
    closeForm: () => void;
    selectedAsset?: Asset;
};

const FormSchema = z.object({
    name: z.string({
        required_error: 'Asset name is required.',
    }),
    value: z.coerce.number({
        required_error: 'Asset value is required.',
    }),
    category: z.string({
        required_error: 'Category is required.',
    }),
    liquidity: z.enum(['High', 'Medium', 'Low'], {
        required_error: 'Liquidity level is required.',
    }),
    purchase_date: z.date().optional(),
    appreciation_rate: z.coerce.number().default(0),
});

const categories = ['Real Estate', 'Vehicles', 'Collectibles', 'Jewelry', 'Art', 'Business Equipment', 'Other'];

const AssetForm = ({ closeForm, selectedAsset }: Props) => {
    const { createAssetMutation, updateAssetMutation, deleteAssetMutation } = useAssetMutations();
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const form = useForm({
        defaultValues: {
            name: selectedAsset?.name || '',
            value: selectedAsset?.value || 0,
            category: selectedAsset?.category || '',
            liquidity: selectedAsset?.liquidity || 'Medium',
            appreciation_rate: selectedAsset?.appreciation_rate || 0,
            purchase_date: selectedAsset?.purchase_date ? new Date(selectedAsset.purchase_date) : undefined,
        },
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<any> = (data: z.infer<typeof FormSchema>) => {
        const formattedData = {
            ...data,
            purchase_date: data.purchase_date ? data.purchase_date.toISOString().split('T')[0] : undefined,
        };

        if (selectedAsset) {
            updateAssetMutation.mutate({
                ...formattedData,
                id: selectedAsset.id,
                user_id: selectedAsset.user_id,
                created_at: selectedAsset.created_at,
            });
        } else {
            createAssetMutation.mutate({
                ...formattedData,
                created_at: new Date().toISOString(),
            });
        }
        closeForm();
    };

    const handleDeleteClick = () => {
        setShowDeleteAlert(true);
    };

    const handleConfirmDelete = () => {
        if (selectedAsset) {
            deleteAssetMutation.mutate(selectedAsset.id);
        }
        closeForm();
    };

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
                                    <Input className='transition-colors hover:bg-zinc-100' {...field} placeholder='Asset Name' />
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
                                    <Input className='transition-colors hover:bg-zinc-100' type='number' {...field} placeholder='Value' />
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
                                        <SelectTrigger className='transition-colors hover:bg-zinc-100'>
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
                                        <SelectTrigger className='transition-colors hover:bg-zinc-100'>
                                            <SelectValue placeholder='Select liquidity' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='High'>High</SelectItem>
                                            <SelectItem value='Medium'>Medium</SelectItem>
                                            <SelectItem value='Low'>Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='purchase_date'
                            render={({ field }) => (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Purchase Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={'outline'} className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                                                    {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                                                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0' align='start'>
                                            <Calendar mode='single' selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date('1900-01-01')} initialFocus />
                                        </PopoverContent>
                                    </Popover>
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
                                    <Input className='transition-colors hover:bg-zinc-100' type='number' step='0.01' {...field} placeholder='0.00' />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className={`flex pt-4 ${selectedAsset ? 'justify-between' : 'justify-end'}`}>
                            {selectedAsset && (
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
                        <AlertDialogTitle>Are you sure you want to delete this asset?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete the asset "{selectedAsset?.name}" and remove all associated data.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete} className='bg-red-600 hover:bg-red-700'>
                            Delete Asset
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default AssetForm;
