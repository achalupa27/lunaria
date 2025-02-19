import type { Meta, StoryObj } from '@storybook/react';
import PremiumTable from '../../components/pricing-tables/premium-table';

const meta = {
    title: 'Website/Pricing/Tables/PremiumTable',
    component: PremiumTable,
    parameters: {
        layout: 'centered',
    },
    args: {
        term: 'Monthly',
        onSignUpClick: () => console.log('Sign up clicked'),
    },
} satisfies Meta<typeof PremiumTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const YearlyTerm: Story = {
    args: {
        term: 'Yearly',
    },
};
