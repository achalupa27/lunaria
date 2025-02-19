import type { Meta, StoryObj } from '@storybook/react';
import Footer from '../index';

// Define the props type for better type checking
type FooterProps = {
    showNewsletter?: boolean;
    onNewsletterSubmit?: (email: string) => void;
};

const meta = {
    title: 'Website/Layout/Footer',
    component: Footer,
    parameters: {
        layout: 'fullscreen',
        a11y: {
            config: {
                rules: [
                    {
                        id: 'button-name',
                        enabled: true,
                    },
                ],
            },
        },
    },
    // Default args
    args: {
        showNewsletter: true,
        onNewsletterSubmit: (email: string) => console.log('Newsletter submitted:', email),
    },
    // Control types and descriptions
    argTypes: {
        showNewsletter: {
            control: 'boolean',
            description: 'Controls visibility of newsletter section',
        },
        onNewsletterSubmit: {
            action: 'newsletter submitted',
            description: 'Called when newsletter form is submitted',
        },
    },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story
export const Default: Story = {};

// Without newsletter
export const WithoutNewsletter: Story = {
    args: {
        showNewsletter: false,
    },
};
