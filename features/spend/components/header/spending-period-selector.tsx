import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SpendingTerm } from '../../hooks/transaction/use-filtered-spends';

type Props = {
    selectedTerm: SpendingTerm;
    onTermChange: (term: SpendingTerm) => void;
};

const SpendingPeriodSelector = ({ selectedTerm, onTermChange }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200'>
                <span>Spending - {selectedTerm}</span>
                <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onTermChange('This Month')}>This Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onTermChange('Last Month')}>Last Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onTermChange('This Year')}>This Year</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onTermChange('Last Year')}>Last Year</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onTermChange('All Time')}>All Time</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SpendingPeriodSelector;
