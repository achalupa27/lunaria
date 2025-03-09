import type { Meta, StoryObj } from '@storybook/react';
import PricingSelection from '..';

const meta = {
    title: 'Website/Pricing/PricingSelection',
    component: PricingSelection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof PricingSelection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
