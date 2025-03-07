import { Button } from '@/components/ui/button';
import { CheckIcon } from 'lucide-react';

type TransactionType = 'spends' | 'makes' | 'saves';

type Props = {
    selectedTypes: TransactionType[];
    onToggleType: (type: TransactionType) => void;
};

const TransactionFilters = ({ selectedTypes, onToggleType }: Props) => {
    const filters: { type: TransactionType; label: string }[] = [
        { type: 'spends', label: 'Purchases' },
        { type: 'makes', label: 'Income' },
        { type: 'saves', label: 'Savings' },
    ];

    return (
        <div className='flex space-x-2'>
            {filters.map(({ type, label }) => (
                <Button key={type} variant={selectedTypes.includes(type) ? 'default' : 'outline'} onClick={() => onToggleType(type)} className='flex items-center space-x-2'>
                    <span>{label}</span>
                    {selectedTypes.includes(type) && <CheckIcon className='h-4 w-4' />}
                </Button>
            ))}
        </div>
    );
};

export default TransactionFilters;
