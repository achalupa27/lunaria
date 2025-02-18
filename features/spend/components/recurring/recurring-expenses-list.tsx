import { formatCurrency } from '@/utils/helper';

type Props = {
    recurringExpenses: RecurringExpense[];
    onViewExpense: (expense: RecurringExpense) => void;
};

const RecurringExpensesList = ({ recurringExpenses, onViewExpense }: Props) => {
    if (!recurringExpenses?.length) return null;

    return (
        <div className='rounded-lg border border-orange-100 bg-white dark:bg-black shadow'>
            <div className='gold-gradient flex h-[40px] items-center rounded-lg rounded-b-none'>
                <div className='flex items-center space-x-2 rounded-md px-2 dark:text-black'>
                    <span>Recurring Expenses</span>
                </div>
            </div>
            <div className='flex-1 overflow-y-auto px-3 py-2'>
                {recurringExpenses.map((expense) => (
                    <div key={expense.id} className='flex cursor-pointer justify-between border-b py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800' onClick={() => onViewExpense(expense)}>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{expense.name}</span>
                            <span className='text-sm text-gray-500'>{expense.category}</span>
                        </div>
                        <div className='flex flex-col items-end'>
                            <span className='font-medium text-yellow-600'>{formatCurrency(expense.amount)}</span>
                            <span className='text-sm text-gray-500'>{expense.period}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecurringExpensesList;
