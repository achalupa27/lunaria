import type { Meta, StoryObj } from '@storybook/react';
import FinalCTASection from '../final-cta-section';

const meta = {
    title: 'Website/Landing/FinalCTASection',
    component: FinalCTASection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof FinalCTASection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
