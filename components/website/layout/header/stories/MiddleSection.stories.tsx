import type { Meta, StoryObj } from '@storybook/react';
import MiddleSection from '../components/middle-section';

const meta = {
    title: 'Website/Layout/Header/MiddleSection',
    component: MiddleSection,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof MiddleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
