import type { Meta, StoryObj } from '@storybook/react';
import DashboardSection from '../dashboard-section';

const meta = {
    title: 'Website/Products/DashboardSection',
    component: DashboardSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof DashboardSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
