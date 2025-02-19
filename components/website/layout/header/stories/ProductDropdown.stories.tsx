import type { Meta, StoryObj } from '@storybook/react';
import ProductDropdown from '../components/middle-section/product-dropdown';

const meta = {
    title: 'Website/Layout/Header/ProductDropdown',
    component: ProductDropdown,
    parameters: {
        layout: 'centered',
    },
    args: {
        category: 'products',
    },
} satisfies Meta<typeof ProductDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
