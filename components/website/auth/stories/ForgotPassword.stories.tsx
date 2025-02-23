import type { Meta, StoryObj } from '@storybook/react';
import ForgotPassword from '../forgot-password';

const meta = {
    title: 'Website/Auth/ForgotPassword',
    component: ForgotPassword,
    parameters: {
        layout: 'centered',
    },
    args: {
        onSuccess: () => console.log('Reset email sent'),
        onBackToLogin: () => console.log('Back to login clicked'),
    },
} satisfies Meta<typeof ForgotPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
