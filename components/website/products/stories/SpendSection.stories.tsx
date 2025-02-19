import type { Meta, StoryObj } from '@storybook/react';
import SpendSection from '../spend-section';

const meta = {
    title: 'Website/Products/SpendSection',
    component: SpendSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof SpendSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
