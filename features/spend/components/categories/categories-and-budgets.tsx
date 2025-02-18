import { formatCurrency } from '@/utils/helper';
import { spendingCategories } from '@/constants';

type Props = {
    categoryTotals: { [key: string]: number };
    budgetProgress: {
        [key: string]: {
            spent: number;
            budget: number;
            period: 'weekly' | 'monthly' | 'yearly';
        };
    };
};

const CategoriesAndBudgets = ({ categoryTotals, budgetProgress }: Props) => {
    return (
        <div className='rounded-lg border border-orange-100 bg-white dark:bg-black shadow'>
            <div className='gold-gradient flex h-[40px] items-center rounded-lg rounded-b-none'>
                <div className='flex items-center space-x-2 rounded-md px-2 dark:text-black'>
                    <span>Categories & Budgets</span>
                </div>
            </div>
            <div className='flex-1 overflow-y-auto px-3 py-2'>
                {spendingCategories
                    .filter((category) => categoryTotals[category] > 0 || budgetProgress[category])
                    .map((category) => (
                        <div key={category} className='flex justify-between border-b py-2'>
                            <div className='font-medium'>{category}</div>
                            <div className='flex items-center space-x-4'>
                                {budgetProgress[category] && (
                                    <div className='text-sm'>
                                        <span className={`font-medium ${budgetProgress[category].spent > budgetProgress[category].budget ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(budgetProgress[category].spent)}</span>
                                        <span className='text-gray-500'>
                                            {' / '}
                                            {formatCurrency(budgetProgress[category].budget)} ({budgetProgress[category].period})
                                        </span>
                                    </div>
                                )}
                                <div className='font-medium text-yellow-600 dark:text-yellow-400'>{formatCurrency(categoryTotals[category] || 0)}</div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CategoriesAndBudgets;
