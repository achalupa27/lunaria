type Make = {
    id: string;
    user_email: string;
    date: string;
    amount: number;
    currency: string;
    source: string;
};

type Save = {
    id: string;
    user_email: string;
    date: string;
    type: 'Withdrawal' | 'Deposit';
    amount: number;
    currency: string;
    account: string;
};

type Spend = {
    id: string;
    user_email: string;
    date: string;
    item: string;
    cost: number;
    currency: string;
    store: string;
    category: string;
    necessity: string;
};

type SpendingCategory = 'Rent' | 'Student Loans' | 'Food' | 'Home' | 'Hygiene' | 'Fitness' | 'Transportation' | 'Subscriptions' | 'Clothing' | 'Electronics';

type FeatureItem = {
    img: string;
    name: string;
    description: string;
    comingSoon: boolean;
};
