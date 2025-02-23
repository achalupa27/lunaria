import type { Meta, StoryObj } from '@storybook/react';
import Home from '../page';

const meta = {
    title: 'Pages/Home',
    component: Home,
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
