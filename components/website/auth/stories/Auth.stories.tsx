import type { Meta, StoryObj } from '@storybook/react';
import Auth from '../index';
import Login from '../log-in';
import SignUp from '../sign-up';
import ForgotPassword from '../forgot-password';
import ConfirmEmail from '../confirm-email';

const meta = {
    title: 'Website/Auth/Modal',
    component: Auth,
    parameters: {
        layout: 'centered',
    },
    args: {
        isOpen: true,
        onClose: () => console.log('Modal closed'),
    },
} satisfies Meta<typeof Auth>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLogin: Story = {
    args: {
        children: <Login onSuccess={() => console.log('Login success')} onSignUpClick={() => console.log('Sign up clicked')} onForgotPasswordClick={() => console.log('Forgot password clicked')} />,
    },
};

export const WithSignUp: Story = {
    args: {
        children: <SignUp onSuccess={() => console.log('Sign up success')} onLoginClick={() => console.log('Login clicked')} />,
    },
};

export const WithForgotPassword: Story = {
    args: {
        children: <ForgotPassword onSuccess={() => console.log('Reset email sent')} onBackToLogin={() => console.log('Back to login clicked')} />,
    },
};

export const WithConfirmEmail: Story = {
    args: {
        children: <ConfirmEmail email='user@example.com' onBackToLogin={() => console.log('Back to login clicked')} />,
    },
};
