type ProductCategory<T = string> = {
    label: string;
    summary: string;
    pageLink: string;
};

type Products<T = string> = {
    [category: string]: ProductCategory<T>[];
};

export const products: Products = {
    products: [
        {
            label: 'Dashboard',
            summary: 'Your personal finance at a glance.',
            pageLink: '/products#dashboard',
        },
        {
            label: 'Income Tracker',
            summary: 'Track your Income.',
            pageLink: '/products#make',
        },
        {
            label: 'Savings Tracker',
            summary: 'Track your Savings.',
            pageLink: '/products#save',
        },
        {
            label: 'Spending Tracker',
            summary: 'Track your Spending.',
            pageLink: '/products#spend',
        },
    ],
};
