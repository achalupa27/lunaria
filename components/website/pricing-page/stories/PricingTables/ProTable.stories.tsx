import type { Meta, StoryObj } from '@storybook/react';
import ProTable from '../../components/pricing-tables/pro-table';

const meta = {
    title: 'Website/Pricing/Tables/ProTable',
    component: ProTable,
    parameters: {
        layout: 'centered',
    },
    args: {
        term: 'Monthly',
        onSignUpClick: () => console.log('Sign up clicked'),
    },
} satisfies Meta<typeof ProTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const YearlyTerm: Story = {
    args: {
        term: 'Yearly',
    },
};
