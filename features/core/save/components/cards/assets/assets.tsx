import { formatCurrency } from '@/utils/helper';
import DisplayCard from '@/components/ui/display-card';

type Props = {
    assets: Asset[];
    onViewAsset: (asset: Asset) => void;
};

const NoAssets = () => {
    return <div className='flex-1 min-h-0 flex items-center h-full justify-center text-zinc-500 text-sm'>No assets</div>;
};

const Assets = ({ assets, onViewAsset }: Props) => {
    if (!assets || assets.length === 0) {
        return (
            <DisplayCard title='Assets'>
                <NoAssets />
            </DisplayCard>
        );
    }

    return (
        <DisplayCard title='Assets'>
            <div className='flex-1 min-h-0 overflow-y-auto scrollbar-none'>
                {assets.map((asset) => (
                    <div key={asset.id} onClick={() => onViewAsset(asset)} className='flex cursor-pointer items-center justify-between py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900'>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{asset.name}</span>
                            <span className='text-zinc-500 text-xs'>{asset.appreciation_rate}%</span>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className='font-medium text-blue-600'>{formatCurrency(asset.value)}</span>
                        </div>
                    </div>
                ))}
            </div>
        </DisplayCard>
    );
};

export default Assets;
