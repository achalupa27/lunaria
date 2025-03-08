interface Spend extends BaseModel {
    date: Date;
    item: string;
    cost: number;
    store: string;
    category: string;
    necessity: 'Need' | 'Want' | 'Waste';
    currency?: string;
}
type SpendCreate = Omit<Spend, keyof BaseModel>;
type SpendUpdate = SpendCreate & { id: string };

interface RecurringExpense extends BaseModel {
    name: string;
    amount: number;
    currency?: string;
    period: 'weekly' | 'monthly' | 'yearly';
    category: string;
    next_billing_date: Date;
}
type RecurringExpenseCreate = Omit<RecurringExpense, keyof BaseModel>;
type RecurringExpenseUpdate = RecurringExpenseCreate & { id: string };

interface Budget extends BaseModel {
    category: string;
    amount: number;
    period: 'monthly' | 'yearly';
}
type BudgetCreate = Omit<Budget, keyof BaseModel>;
type BudgetUpdate = BudgetCreate & { id: string };

type Necessity = 'Need' | 'Want' | 'Waste';
type SpendingCategory = 'Rent' | 'Student Loans' | 'Food' | 'Home' | 'Hygiene' | 'Fitness' | 'Transportation' | 'Subscriptions' | 'Clothing' | 'Electronics';
