import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import ProtectedFeature from '@/components/feature';

type Props = {
    onSettingsClick: () => void;
    onAnalyzeClick: () => void;
    onBudgetClick: () => void;
    onNewSpendClick: () => void;
    userRole?: string;
};

const ActionButtons = ({ onSettingsClick, onAnalyzeClick, onBudgetClick, onNewSpendClick, userRole }: Props) => {
    return (
        <>
            <Button variant='secondary' className='rounded-lg' size='icon' onClick={onSettingsClick}>
                <Settings />
            </Button>
            <ProtectedFeature requiredRole='premium' userRole={userRole}>
                <Button variant='secondary' className='rounded-lg' onClick={onAnalyzeClick}>
                    Analyze Spending
                </Button>
            </ProtectedFeature>
            <Button variant='secondary' className='rounded-lg' onClick={onBudgetClick}>
                + Create Budget
            </Button>

            <Button className='rounded-lg' onClick={onNewSpendClick}>
                + New Spending
            </Button>
        </>
    );
};

export default ActionButtons;
