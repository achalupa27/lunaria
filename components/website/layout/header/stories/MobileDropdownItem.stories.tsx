import type { Meta, StoryObj } from '@storybook/react';
import MobileDropdownItem from '../components/right-section/mobile-dropdown-item';

const meta = {
    title: 'Website/Layout/Header/MobileDropdownItem',
    component: MobileDropdownItem,
    parameters: {
        layout: 'centered',
    },
    args: {
        label: 'Dashboard',
        summary: 'Your personal finance all in one place.',
        link: '/products#dashboard',
    },
} satisfies Meta<typeof MobileDropdownItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IncomeTracker: Story = {
    args: {
        label: 'Income Tracker',
        summary: 'Track your Income.',
        link: '/products#make',
    },
};
