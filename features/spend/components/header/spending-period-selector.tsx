import PeriodSelector, { Period } from '@/features/shared/components/period-selector';

type Props = {
    selectedTerm: Period;
    onTermChange: (term: Period) => void;
};

const SpendingPeriodSelector = ({ selectedTerm, onTermChange }: Props) => {
    return <PeriodSelector selectedPeriod={selectedTerm} onPeriodChange={onTermChange} label='Spending' />;
};

export default SpendingPeriodSelector;
