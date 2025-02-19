import type { Meta, StoryObj } from '@storybook/react';
import SolutionSection from '../solution-section';

const meta = {
    title: 'Website/Landing/SolutionSection',
    component: SolutionSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof SolutionSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
