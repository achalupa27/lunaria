import { formatCurrency } from '@/utils/helper';
import { spendingCategories } from '@/constants';
import Card from '@/components/ui/card';

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
        <Card>
            <div className='p-4'>
                <h3 className='text-lg font-semibold mb-4'>Categories & Budgets</h3>
                <div className='flex-1 overflow-y-auto'>
                    {spendingCategories
                        .filter((category) => categoryTotals[category] > 0 || budgetProgress[category])
                        .map((category) => (
                            <div key={category} className='flex justify-between py-2'>
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
        </Card>
    );
};

export default CategoriesAndBudgets;
