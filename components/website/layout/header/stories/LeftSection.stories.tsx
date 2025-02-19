import type { Meta, StoryObj } from '@storybook/react';
import LeftSection from '../components/left-section';

const meta = {
    title: 'Website/Layout/Header/LeftSection',
    component: LeftSection,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof LeftSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
