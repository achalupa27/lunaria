import type { Meta, StoryObj } from '@storybook/react';
import MakeSection from '../make-section';

const meta = {
    title: 'Website/Products/MakeSection',
    component: MakeSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof MakeSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
