import type { Meta, StoryObj } from '@storybook/react';
import ConfirmEmail from '../confirm-email';

const meta = {
    title: 'Website/Auth/ConfirmEmail',
    component: ConfirmEmail,
    parameters: {
        layout: 'centered',
    },
    args: {
        email: 'user@example.com',
        onBackToLogin: () => console.log('Back to login clicked'),
    },
} satisfies Meta<typeof ConfirmEmail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
