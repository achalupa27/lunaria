import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export type Period = 'This Month' | 'Last Month' | 'This Year' | 'Last Year' | 'All Time';

type Props = {
    selectedPeriod: Period;
    onPeriodChange: (period: Period) => void;
    label?: string;
};

const PeriodSelector = ({ selectedPeriod, onPeriodChange, label = 'Spending' }: Props) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='-ml-4 flex cursor-pointer items-center space-x-3 rounded-xl px-4 text-[40px] font-medium hover:bg-zinc-200 dark:hover:bg-zinc-800'>
                <span>
                    {label} - {selectedPeriod}
                </span>
                <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onPeriodChange('This Month')}>This Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPeriodChange('Last Month')}>Last Month</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPeriodChange('This Year')}>This Year</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPeriodChange('Last Year')}>Last Year</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onPeriodChange('All Time')}>All Time</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default PeriodSelector;
