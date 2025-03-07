import InputGroup from '@/components/ui/input-groups/input-group';
import SelectGroup from '@/components/ui/input-groups/select-group';
import { Control } from 'react-hook-form';

type Props = {
    control: Control<SavingsAccountCreate>;
};

const SavingsAccountFields = ({ control }: Props) => {
    const interestPeriods = ['Daily', 'Monthly', 'Quarterly', 'Annually'];

    return (
        <>
            <InputGroup control={control} name='name' label='Account Name' placeholder='Account Name' />
            <InputGroup control={control} name='balance' label='Balance' placeholder='0.00' type='number' step='0.01' />
            <InputGroup control={control} name='interest_rate' label='Interest Rate (%)' placeholder='0.00' type='number' step='0.01' />
            <SelectGroup control={control} name='interest_period' label='Interest Period' placeholder='Select period' options={interestPeriods} />
        </>
    );
};

export default SavingsAccountFields;
