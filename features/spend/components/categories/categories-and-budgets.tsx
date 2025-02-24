import { formatCurrency } from '@/utils/helper';
import { spendingCategories } from '@/constants';
import DisplayCard from '@/features/shared/components/display-card';

type Props = {
    categoryTotals: { [key: string]: number };
    budgetProgress: {
        [key: string]: {
            spent: number;
            budget: number;
            period: 'weekly' | 'monthly' | 'yearly';
        };
    };
    onBudgetClick?: (category: string) => void;
};

const CategoriesAndBudgets = ({ categoryTotals, budgetProgress, onBudgetClick }: Props) => {
    return (
        <DisplayCard title='Categories & Budgets'>
            {spendingCategories
                .filter((category) => categoryTotals[category] > 0 || budgetProgress[category])
                .map((category) => (
                    <div key={category} className='flex justify-between py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer' onClick={() => onBudgetClick?.(category)}>
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
        </DisplayCard>
    );
};

export default CategoriesAndBudgets;
