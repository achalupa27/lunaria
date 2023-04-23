type Receipt = {
    store: string;
    cost: number;
    category: SpendingCategory;
    items: Item[];
};

type Make = {
    id?: string;
    source: string;
    amount: number;
    date: string;
};

type Save = {
    id?: string;
    type: string;
    amount: number;
    date: string;
};

type Spend = {
    id?: string;
    store: string;
    amount: number;
    date: string;
};

type SpendingCategory = 'Rent' | 'Student Loans' | 'Food' | 'Home' | 'Hygiene' | 'Fitness' | 'Transportation' | 'Subscriptions' | 'Clothing' | 'Electronics';

type Item = {
    name: string;
    price: number;
};

type Feature = {
    img: string;
    name: string;
    description: string;
    comingSoon: boolean;
};
