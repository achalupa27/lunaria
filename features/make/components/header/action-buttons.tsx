import { Button } from '@/components/ui/button';
import { Settings, Plus } from 'lucide-react';

type Props = {
    onSettingsClick: () => void;
    onAnalyzeClick: () => void;
    onNewMakeClick: () => void;
};

const ActionButtons = ({ onSettingsClick, onAnalyzeClick, onNewMakeClick }: Props) => {
    return (
        <div className='flex items-center space-x-2'>
            <Button variant='secondary' className='rounded-lg' size='icon' onClick={onSettingsClick}>
                <Settings />
            </Button>
            <Button variant='secondary' className='rounded-lg' onClick={onAnalyzeClick}>
                Analyze Income
            </Button>
            <Button className='rounded-lg' onClick={onNewMakeClick}>
                <Plus />
                New Income
            </Button>
        </div>
    );
};

export default ActionButtons;
