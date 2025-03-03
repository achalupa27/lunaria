import DateGroup from '@/components/ui/input-groups/date-group';
import InputGroup from '@/components/ui/input-groups/input-group';
import SelectGroup from '@/components/ui/input-groups/select-group';
import { necessityCategories, spendingCategories } from '@/constants';
import { Control } from 'react-hook-form';

type Props = {
    control: Control<SpendCreate>;
};

const OneTimeExpenseFields = ({ control }: Props) => {
    return (
        <>
            <InputGroup control={control} name='item' label='Item' placeholder='Item' />
            <InputGroup control={control} name='cost' label='Cost' placeholder='Cost' type='number' step='0.01' />
            <SelectGroup control={control} name='category' label='Category' placeholder='Select category' options={spendingCategories} />
            <SelectGroup control={control} name='necessity' label='Necessity' placeholder='Select necessity' options={necessityCategories} />
            <InputGroup control={control} name='store' label='Store' placeholder='Store' />
            <DateGroup control={control} name='date' label='Purchase Date' />
        </>
    );
};

export default OneTimeExpenseFields;
