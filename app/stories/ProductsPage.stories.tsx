import type { Meta, StoryObj } from '@storybook/react';
import Products from '../page';

const meta = {
    title: 'Pages/Products',
    component: Products,
    parameters: {
        layout: 'fullscreen',
        nextjs: {
            appDirectory: true,
        },
    },
} satisfies Meta<typeof Products>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
