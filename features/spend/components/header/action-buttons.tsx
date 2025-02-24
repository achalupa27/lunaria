import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import ProtectedFeature from '@/components/feature';

type Props = {
    onSettingsClick: () => void;
    onBudgetClick: () => void;
    onNewSpendClick: () => void;
    userRole?: UserRole;
};

const ActionButtons = ({ onSettingsClick, onBudgetClick, onNewSpendClick, userRole }: Props) => {
    return (
        <div className='flex items-center space-x-2'>
            <Button variant='secondary' className='rounded-lg' size='icon' onClick={onSettingsClick}>
                <Settings />
            </Button>
            <Button variant='secondary' className='rounded-lg' onClick={onBudgetClick}>
                + Create Budget
            </Button>

            <Button className='rounded-lg' onClick={onNewSpendClick}>
                + New Spending
            </Button>
        </div>
    );
};

export default ActionButtons;
