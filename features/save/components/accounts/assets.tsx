import { formatCurrency } from '@/utils/helper';
import Card from '@/components/ui/card';

type Props = {
    assets: Asset[];
    onViewAsset: (asset: Asset) => void;
};

const Assets = ({ assets, onViewAsset }: Props) => {
    if (!assets?.length) return null;

    // Group assets by liquidity
    const groupedAssets = assets.reduce(
        (acc, asset) => {
            if (!acc[asset.liquidity]) {
                acc[asset.liquidity] = [];
            }
            acc[asset.liquidity].push(asset);
            return acc;
        },
        {} as Record<AssetLiquidity, Asset[]>
    );

    const liquidityOrder: AssetLiquidity[] = ['High', 'Medium', 'Low'];

    return (
        <Card className='px-8 py-6'>
            <div className='flex justify-between'>
                <h3 className='text-lg font-semibold mb-4'>Assets</h3>
            </div>
            <div className='flex-1 overflow-y-auto'>
                {liquidityOrder.map((liquidity) => {
                    const liquidityAssets = groupedAssets[liquidity];
                    if (!liquidityAssets?.length) return null;

                    return (
                        <div key={liquidity}>
                            <h4 className='text-sm text-gray-500 mt-4 mb-2'>{liquidity} Liquidity</h4>
                            {liquidityAssets.map((asset) => (
                                <div key={asset.id} onClick={() => onViewAsset(asset)} className='flex cursor-pointer items-center justify-between px-2 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900'>
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>{asset.name}</span>
                                        <span className='text-sm text-gray-500'>{asset.category}</span>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <span className='font-medium text-blue-600'>{formatCurrency(asset.value)}</span>
                                        <span className='text-sm text-gray-500'>{asset.appreciation_rate}% annual</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default Assets;
