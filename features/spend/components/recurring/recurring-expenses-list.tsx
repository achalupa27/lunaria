import { formatCurrency } from '@/utils/helper';
import Card from '@/components/ui/card';

type Props = {
    recurringExpenses: RecurringExpense[];
    onViewExpense: (expense: RecurringExpense) => void;
};

const RecurringExpensesList = ({ recurringExpenses, onViewExpense }: Props) => {
    if (!recurringExpenses?.length) return null;

    return (
        <Card>
            <div className='p-4'>
                <h3 className='text-lg font-semibold mb-4'>Recurring Spends</h3>
                <div className='flex-1 overflow-y-auto'>
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
                </div>
            </div>
        </Card>
    );
};

export default RecurringExpensesList;
