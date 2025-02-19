import type { Meta, StoryObj } from '@storybook/react';
import ProblemSection from '../problem-section';

const meta = {
    title: 'Website/Landing/ProblemSection',
    component: ProblemSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof ProblemSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
