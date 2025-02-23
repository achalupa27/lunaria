import type { Meta, StoryObj } from '@storybook/react';
import Login from '../log-in';

const meta = {
    title: 'Website/Auth/Login',
    component: Login,
    parameters: {
        layout: 'centered',
    },
    args: {
        onSuccess: () => console.log('Login success'),
        onSignUpClick: () => console.log('Sign up clicked'),
        onForgotPasswordClick: () => console.log('Forgot password clicked'),
    },
} satisfies Meta<typeof Login>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
