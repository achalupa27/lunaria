import type { Meta, StoryObj } from '@storybook/react';
import SaveSection from '../save-section';

const meta = {
    title: 'Website/Products/SaveSection',
    component: SaveSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof SaveSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
