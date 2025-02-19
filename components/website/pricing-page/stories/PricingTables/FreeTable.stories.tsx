import type { Meta, StoryObj } from '@storybook/react';
import FreeTable from '../../components/pricing-tables/free-table';

const meta = {
    title: 'Website/Pricing/Tables/FreeTable',
    component: FreeTable,
    parameters: {
        layout: 'centered',
    },
    args: {
        onSignUpClick: () => console.log('Sign up clicked'),
    },
} satisfies Meta<typeof FreeTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
