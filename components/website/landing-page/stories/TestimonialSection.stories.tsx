import type { Meta, StoryObj } from '@storybook/react';
import TestimonialSection from '../testimonial-section';

const meta = {
    title: 'Website/Landing/TestimonialSection',
    component: TestimonialSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof TestimonialSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
