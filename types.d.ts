type Make = {
    id: string;
    user_email: string;
    date: Date;
    amount: number;
    currency?: string;
    source: string;
};

type Save = {
    id: string;
    user_email: string;
    date: Date;
    type: 'Withdrawal' | 'Deposit' | string;
    amount: number;
    currency?: string;
    account: string;
};

type DebtAccount = {
    id: string;
    user_email: string;
    name: string;
    balance: number;
};

type SavingsAccount = {
    id: string;
    user_email: string;
    name: string;
    balance: number;
};

type Spend = {
    id: string;
    user_email: string;
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
    description: string;
    includedFree: string | boolean;
    includedProfessional: boolean;
};
