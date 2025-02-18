type Make = {
    id: string;
    // user_id: string;
    date: Date;
    amount: number;
    currency?: string;
    source: string;
};

type Save = {
    id: string;
    // user_id: string;
    date: Date;
    type: 'Withdrawal' | 'Deposit' | string;
    amount: number;
    currency?: string;
    account: string;
};

type DebtAccount = {
    id: string;
    // user_id: string;
    name: string;
    balance: number;
};

type SavingsAccount = {
    id: string;
    // user_id: string;
    name: string;
    balance: number;
};

// Update the Spend type to include recurring fields
type Spend = {
    id: string;
    date: Date;
    item: string;
    cost: number;
    store: string;
    category: string;
    necessity: 'Need' | 'Want' | 'Waste';
    expenseType: 'one-time' | 'recurring';
    // Optional recurring fields
    period?: 'weekly' | 'monthly' | 'yearly';
    next_billing_date?: Date;
};

type Budget = {
    id: string;
    user_id: string;
    category: string;
    amount: number;
    period: 'monthly' | 'yearly';
    created_at: string;
};

type RecurringExpense = {
    id: string;
    name: string;
    description?: string;
    amount: number;
    period: 'weekly' | 'monthly' | 'yearly';
    category: string;
    next_billing_date: Date;
    created_at: string;
};

type SpendDataPoint = { date: string; spent: number }[];

type Necessity = 'Need' | 'Want' | 'Waste';

type SpendingCategory = 'Rent' | 'Student Loans' | 'Food' | 'Home' | 'Hygiene' | 'Fitness' | 'Transportation' | 'Subscriptions' | 'Clothing' | 'Electronics';

type FeatureItem = {
    img: string;
    name: string;
    description: string;
    comingSoon: boolean;
};

type FeatureRowType = {
    feature: string;
    includedFree: string | boolean;
    includedProfessional: string | boolean;
    includedPremium: string | boolean;
};

type Subscription = {
    id: string;
    role: 'free' | 'pro' | 'premium';
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
    price_id?: string;
    status?: string;
    created_at: string;
    updated_at: string;
};

type UserRole = 'free' | 'pro' | 'premium';
