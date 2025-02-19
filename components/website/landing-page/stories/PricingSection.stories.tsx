import type { Meta, StoryObj } from '@storybook/react';
import PricingSection from '../pricing-section';

const meta = {
    title: 'Website/Landing/PricingSection',
    component: PricingSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof PricingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
