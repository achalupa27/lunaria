import type { Meta, StoryObj } from '@storybook/react';
import ProductsHero from '../products-hero';

const meta = {
    title: 'Website/Products/ProductsHero',
    component: ProductsHero,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ProductsHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
