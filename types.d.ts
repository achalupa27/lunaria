type Make = {
    id: string;
    user_id: string;
    date: Date;
    amount: number;
    currency?: string;
    source: string;
};

type Save = {
    id: string;
    user_id: string;
    date: Date;
    type: 'Withdrawal' | 'Deposit' | string;
    amount: number;
    currency?: string;
    account: string;
};

type DebtAccount = {
    id: string;
    user_id: string;
    name: string;
    balance: number;
};

type SavingsAccount = {
    id: string;
    user_id: string;
    name: string;
    balance: number;
};

type Spend = {
    id: string;
    user_id: string;
    date: Date;
    item: string;
    cost: number;
    currency?: string;
    store: string;
    category: string;
    necessity: Necessity | string;
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

type FeatureRow = {
    feature: string;
    includedFree: string | boolean;
    includedProfessional: string | boolean;
    includedPremium: string | boolean;
};

export type Subscription = {
    id: string;
    role: 'free' | 'pro' | 'premium';
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
    price_id?: string;
    status?: string;
    created_at: string;
    updated_at: string;
};
