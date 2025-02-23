import type { Meta, StoryObj } from '@storybook/react';
import SignUp from '../sign-up';

const meta = {
    title: 'Website/Auth/SignUp',
    component: SignUp,
    parameters: {
        layout: 'centered',
    },
    args: {
        onSuccess: () => console.log('Sign up success'),
        onLoginClick: () => console.log('Login clicked'),
    },
} satisfies Meta<typeof SignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
