import type { Meta, StoryObj } from '@storybook/react';
import Links from '../components/links';

type LinksProps = {
    links: {
        title: string;
        items: Array<{
            label: string;
            href: string;
        }>;
    }[];
};

const meta = {
    title: 'Website/Layout/Footer/Links',
    component: Links,
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
    args: {
        links: [
            {
                title: 'Product',
                items: [
                    { label: 'Features', href: '/features' },
                    { label: 'Pricing', href: '/pricing' },
                    { label: 'Documentation', href: '/docs' },
                ],
            },
            {
                title: 'Company',
                items: [
                    { label: 'About', href: '/about' },
                    { label: 'Blog', href: '/blog' },
                    { label: 'Contact', href: '/contact' },
                ],
            },
        ],
    },
    argTypes: {
        links: {
            control: 'object',
            description: 'Array of link groups with titles and items',
        },
    },
} satisfies Meta<typeof Links>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story
export const Default: Story = {};
