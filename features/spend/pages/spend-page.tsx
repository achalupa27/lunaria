import { useState } from 'react';
import BudgetForm from '../components/forms/budget-form';

const SpendPage = () => {
    const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
    const [showBudgetForm, setShowBudgetForm] = useState(false);

    // ... other code and data fetching

    const handleBudgetClick = (category: string) => {
        // Find the budget for this category
        const budget = budgets?.find((b) => b.category === category);
        if (budget) {
            setSelectedBudget(budget);
            setShowBudgetForm(true);
        }
    };

    return (
        <div>
            {/* ... other components */}

            <CategoriesAndBudgets categoryTotals={categoryTotals} budgetProgress={budgetProgress} onBudgetClick={handleBudgetClick} />

            {showBudgetForm && (
                <BudgetForm
                    selectedBudget={selectedBudget}
                    closeForm={() => {
                        setShowBudgetForm(false);
                        setSelectedBudget(null);
                    }}
                />
            )}
        </div>
    );
};

export default SpendPage;
