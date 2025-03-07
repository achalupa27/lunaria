import { Button } from '@/components/ui/button';
import { Settings, Plus } from 'lucide-react';

type Props = {
    onNewMakeClick: () => void;
};

const ActionButtons = ({ onNewMakeClick }: Props) => {
    return (
        <div className='flex items-center space-x-2'>
            <Button className='rounded-lg' onClick={onNewMakeClick}>
                <Plus />
                New Income
            </Button>
        </div>
    );
};

export default ActionButtons;
