import type { Meta, StoryObj } from '@storybook/react';
import HeroSection from '../hero-section';

const meta = {
    title: 'Website/Landing/HeroSection',
    component: HeroSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
