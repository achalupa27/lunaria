import DateGroup from '@/components/ui/input-groups/date-group';
import InputGroup from '@/components/ui/input-groups/input-group';
import SelectGroup from '@/components/ui/input-groups/select-group';
import { spendingCategories } from '@/constants';
import { Control } from 'react-hook-form';

type Props = {
    control: Control<RecurringExpenseCreate>;
};

const RecurringExpenseFields = ({ control }: Props) => {
    return (
        <>
            <InputGroup control={control} name='name' label='Name' placeholder='Expense name' />
            <InputGroup control={control} name='amount' label='Amount' placeholder='Amount' type='number' step='0.01' />
            <SelectGroup control={control} name='period' label='Billing Period' placeholder='Select period' options={['weekly', 'monthly', 'yearly']} />
            <SelectGroup control={control} name='category' label='Category' placeholder='Select category' options={spendingCategories} />
            <DateGroup control={control} name='next_billing_date' label='Next Billing Date' />
        </>
    );
};

export default RecurringExpenseFields;
