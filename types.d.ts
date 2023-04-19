type Receipt = {
    store: string;
    cost: number;
    category: SpendingCategory;
    items: Item[];
};

type SpendingCategory = 'Rent' | 'Student Loans' | 'Food' | 'Home' | 'Hygiene' | 'Fitness' | 'Transportation' | 'Subscriptions' | 'Clothing' | 'Electronics';

type Item = {
    name: string;
    price: number;
};
