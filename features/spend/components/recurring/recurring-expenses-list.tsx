import { formatCurrency } from '@/utils/helper';
import DisplayCard from '@/features/shared/components/display-card';

type Props = {
    recurringExpenses: RecurringExpense[];
    onViewExpense: (expense: RecurringExpense) => void;
};

const RecurringExpensesList = ({ recurringExpenses, onViewExpense }: Props) => {
    if (!recurringExpenses?.length) {
        return (
            <DisplayCard title='Recurring Spends'>
                <div className='flex-1 min-h-0 flex items-center h-full justify-center text-gray-500'>No recurring expenses</div>
            </DisplayCard>
        );
    }

    return (
        <DisplayCard title='Recurring Spends'>
            {recurringExpenses.map((expense) => (
                <div key={expense.id} className='flex cursor-pointer justify-between p-2 hover:bg-zinc-50 rounded-lg dark:hover:bg-zinc-800' onClick={() => onViewExpense(expense)}>
                    <div className='flex flex-col'>
                        <span className='font-medium'>{expense.name}</span>
                    </div>
                    <div className='flex flex-col items-end'>
                        <span className='font-medium text-yellow-600'>
                            {formatCurrency(expense.amount)}
                            <span className='text-sm text-gray-500'>/{expense.period.slice(0, 1)}</span>
                        </span>
                    </div>
                </div>
            ))}
        </DisplayCard>
    );
};

export default RecurringExpensesList;
