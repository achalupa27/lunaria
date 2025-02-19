import type { Meta, StoryObj } from '@storybook/react';
import DropdownItem from '../components/middle-section/product-dropdown/dropdown-item';

const meta = {
    title: 'Website/Layout/Header/DropdownItem',
    component: DropdownItem,
    parameters: {
        layout: 'centered',
    },
    args: {
        item: {
            label: 'Dashboard',
            summary: 'Your personal finance all in one place.',
            pageLink: '/products#dashboard',
        },
    },
} satisfies Meta<typeof DropdownItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IncomeTracker: Story = {
    args: {
        item: {
            label: 'Income Tracker',
            summary: 'Track your Income.',
            pageLink: '/products#make',
        },
    },
};

export const SavingsTracker: Story = {
    args: {
        item: {
            label: 'Savings Tracker',
            summary: 'Track your Savings.',
            pageLink: '/products#save',
        },
    },
};
