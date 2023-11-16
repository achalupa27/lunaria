type Make = {
    _id: string;
    user_id: string;
    date: string;
    amount: number;
    source: string;
};

type Save = {
    _id: string;
    user_id: string;
    date: string;
    type: 'Withdrawal' | 'Deposit';
    amount: number;
    account: string;
};

type Spend = {
    _id: string;
    user_id: string;
    date: string;
    item: string;
    cost: number;
    category: string;
};

type SpendingCategory = 'Rent' | 'Student Loans' | 'Food' | 'Home' | 'Hygiene' | 'Fitness' | 'Transportation' | 'Subscriptions' | 'Clothing' | 'Electronics';

type FeatureItem = {
    img: string;
    name: string;
    description: string;
    comingSoon: boolean;
};
