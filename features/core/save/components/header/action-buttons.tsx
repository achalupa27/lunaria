import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

type Props = {
    onAddAccountClick: () => void;
    onNewSaveClick: () => void;
    onNewAssetClick: () => void;
};

const ActionButtons = ({ onAddAccountClick, onNewSaveClick, onNewAssetClick }: Props) => {
    return (
        <div className='flex items-center space-x-2'>
            <Button variant='secondary' className='rounded-lg' onClick={onAddAccountClick}>
                <Plus />
                New Account
            </Button>
            <Button variant='secondary' className='rounded-lg' onClick={onNewAssetClick}>
                <Plus />
                New Asset
            </Button>
            <Button className='rounded-lg' onClick={onNewSaveClick}>
                <Plus />
                New Saving
            </Button>
        </div>
    );
};

export default ActionButtons;
