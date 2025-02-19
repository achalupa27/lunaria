import type { Meta, StoryObj } from '@storybook/react';
import FeaturesSection from '../features-section';

const meta = {
    title: 'Website/Landing/FeaturesSection',
    component: FeaturesSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof FeaturesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
