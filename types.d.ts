type Make = {
    id: string;
    user_id: string;
    date: string;
    source: string;
    amount: number;
};

type Save = {
    id: string;
    user_id: string;
    date: string;
    type: 'Withdrawal' | 'Deposit';
    account: string;
    amount: number;
};

type Spend = {
    id: string;
    user_id: string;
    date: string;
    store: string;
    total: number;
    items: SpendingItem[];
};

type SpendingItem = {
    id: string;
    item: string;
    price: number;
    category: SpendingCategory;
};

type SpendingCategory = 'Rent' | 'Student Loans' | 'Food' | 'Home' | 'Hygiene' | 'Fitness' | 'Transportation' | 'Subscriptions' | 'Clothing' | 'Electronics';

type FeatureItem = {
    img: string;
    name: string;
    description: string;
    comingSoon: boolean;
};
