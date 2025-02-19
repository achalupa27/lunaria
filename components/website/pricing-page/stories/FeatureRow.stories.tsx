import type { Meta, StoryObj } from '@storybook/react';
import FeatureRow from '../components/feature-comparison/feature-row';

const meta = {
    title: 'Website/Pricing/FeatureRow',
    component: FeatureRow,
    parameters: {
        layout: 'centered',
    },
    args: {
        feature: {
            feature: 'AI Analysis',
            includedFree: false,
            includedProfessional: true,
            includedPremium: true,
        },
    },
} satisfies Meta<typeof FeatureRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
