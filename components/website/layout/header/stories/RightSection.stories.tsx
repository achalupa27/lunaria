import type { Meta, StoryObj } from '@storybook/react';
import RightSection from '../components/right-section';

const meta = {
    title: 'Website/Layout/Header/RightSection',
    component: RightSection,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof RightSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
