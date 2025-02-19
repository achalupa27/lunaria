import type { Meta, StoryObj } from '@storybook/react';
import BrandInfo from '../components/brand-info';

const meta = {
    title: 'Website/Layout/Footer/BrandInfo',
    component: BrandInfo,
    parameters: {
        layout: 'fullscreen',
        a11y: {
            config: {
                rules: [
                    {
                        id: 'button-name',
                        enabled: true,
                    },
                ],
            },
        },
    },
} satisfies Meta<typeof BrandInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story
export const Default: Story = {};
