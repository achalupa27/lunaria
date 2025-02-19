import type { Meta, StoryObj } from '@storybook/react';
import FAQSection from '../faq-section';

const meta = {
    title: 'Website/Landing/FAQSection',
    component: FAQSection,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof FAQSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
