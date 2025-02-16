import type { Meta, StoryObj } from '@storybook/react';
import Header from './index';
import { ThemeProvider } from 'next-themes';
import { createClient } from '@supabase/supabase-js';

// Create a mock Supabase client
const mockSupabase = createClient('https://mock.supabase.co', 'mock-key');

// Meta configuration for the Header component
const meta = {
    title: 'Website/Layout/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                <div className='light'>
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {};

// Dark theme story
export const DarkTheme: Story = {
    decorators: [
        (Story) => (
            <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
                <div className='dark'>
                    <Story />
                </div>
            </ThemeProvider>
        ),
    ],
};

// Mobile view story
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile1',
        },
    },
};

// Tablet view story
export const Tablet: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'tablet',
        },
    },
};
