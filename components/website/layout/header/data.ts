type ProductCategory<T = string> = {
    label: string;
    summary: string;
};

type Products<T = string> = {
    [category: string]: ProductCategory<T>[];
};

export const products: Products = {
    products: [
        {
            label: 'Dashboard',
            summary: 'Your personal finance at a glance.',
        },
        {
            label: 'Income Tracker',
            summary: 'Track your Income.',
        },
        {
            label: 'Savings Tracker',
            summary: 'Track your Savings.',
        },
        {
            label: 'Spending Tracker',
            summary: 'Track your Spending.',
        },
    ],
};
