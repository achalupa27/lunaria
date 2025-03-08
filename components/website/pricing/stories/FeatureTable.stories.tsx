import type { Meta, StoryObj } from '@storybook/react';
import FeatureTable from '../components/feature-comparison/feature-table';

const meta = {
    title: 'Website/Pricing/FeatureTable',
    component: FeatureTable,
    parameters: {
        layout: 'centered',
    },
    args: {
        category: 'General',
        features: {
            'Basic Features': [
                {
                    feature: 'AI Analysis',
                    includedFree: false,
                    includedProfessional: true,
                    includedPremium: true,
                },
            ],
        },
    },
} satisfies Meta<typeof FeatureTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
