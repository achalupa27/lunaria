import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { CheckCircle, CircleX } from 'lucide-react';
import { createAssetService } from '../../services/assets/create-asset-service';
import { updateAssetService } from '../../services/assets/update-asset-service';
import { deleteAssetService } from '../../services/assets/delete-asset-service';

export const useAssetMutations = () => {
    const queryClient = useQueryClient();

    const createAssetMutation = useMutation({
        mutationFn: (newAsset: Omit<Asset, 'id' | 'user_id'>) => createAssetService(newAsset),
        onSuccess: (newAsset: Asset) => {
            queryClient.setQueryData(['assets'], (oldAssets: Asset[] = []) => [...oldAssets, newAsset]);
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Asset created!</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to create asset.</span>
                    </div>
                ),
            });
        },
    });

    const updateAssetMutation = useMutation({
        mutationFn: async (updatedAsset: Asset) => {
            return updateAssetService(updatedAsset);
        },
        onSuccess: (updatedAsset: Asset) => {
            queryClient.setQueryData(['assets'], (oldAssets: Asset[] = []) => oldAssets.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset)));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Asset updated!</span>
                    </div>
                ),
            });
        },
        onError: (error: any) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to update asset.</span>
                    </div>
                ),
            });
        },
    });

    const deleteAssetMutation = useMutation({
        mutationFn: (assetId: string) => deleteAssetService(assetId),
        onSuccess: (_, deletedAssetId: string) => {
            queryClient.setQueryData(['assets'], (oldAssets: Asset[] = []) => oldAssets.filter((asset) => asset.id !== deletedAssetId));
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CheckCircle className='text-green-500' /> <span className='text-lg'>Asset deleted.</span>
                    </div>
                ),
            });
        },
        onError: (error) => {
            toast({
                description: (
                    <div className='flex items-center space-x-3'>
                        <CircleX className='text-red-500' /> <span className='text-lg'>Failed to delete asset.</span>
                    </div>
                ),
            });
        },
    });

    return {
        createAssetMutation,
        updateAssetMutation,
        deleteAssetMutation,
    };
};
