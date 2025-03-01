import PeriodSelector, { Period } from '@/components/ui/period-selector';

type Props = {
    selectedTerm: Period;
    onTermChange: (term: Period) => void;
};

const MakingPeriodSelector = ({ selectedTerm, onTermChange }: Props) => {
    return <PeriodSelector selectedPeriod={selectedTerm} onPeriodChange={onTermChange} label='Making' />;
};

export default MakingPeriodSelector;
