import type { Meta, StoryObj } from '@storybook/react';
import Header from '../index';
import { ThemeProvider } from 'next-themes';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/test';

// Define the props type for better type checking
type HeaderProps = {
    isLoggedIn: boolean;
    isLoading: boolean;
    user: { name: string; email?: string; avatar?: string } | null;
    onLogin: () => void;
    onLogout: () => void;
    onMenuToggle: (isOpen: boolean) => void;
    error?: string;
};

// Meta configuration for the Header component
const meta = {
    title: 'Website/Layout/Header',
    component: Header,
    parameters: {
        layout: 'fullscreen',
        a11y: {
            // Optional configuration
            config: {
                rules: [
                    {
                        // Example: ensure all buttons have accessible names
                        id: 'button-name',
                        enabled: true,
                    },
                ],
            },
        },
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
    // Add controls (args)
    args: {
        isLoggedIn: false,
        isLoading: false,
        user: null,
        onLogin: () => {},
        onLogout: () => {},
        onMenuToggle: (isOpen: boolean) => {},
    },
    // Add control types and descriptions
    argTypes: {
        isLoggedIn: {
            control: 'boolean',
            description: 'Controls logged in state',
        },
        isLoading: {
            control: 'boolean',
            description: 'Shows loading state',
        },
        user: {
            control: 'object',
            description: 'User data object',
        },
        onLogin: {
            action: 'logged in',
            description: 'Called when login button is clicked',
        },
        onLogout: {
            action: 'logged out',
            description: 'Called when logout button is clicked',
        },
        onMenuToggle: {
            action: 'menu toggled',
            description: 'Called when mobile menu is toggled',
        },
        error: {
            control: 'text',
            description: 'Error message to display',
        },
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Add these new stories before your other viewport stories
export const FullHD: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'fullHD',
        },
    },
};
// Add this new story along with your other viewport stories
export const Desktop2XL: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'desktop2xl',
        },
    },
};

// Default story (Desktop xl and above: >= 1280px)
export const Desktop: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'desktop',
        },
    },
};

// Large screens (lg: 1024px - 1279px)
export const Large: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'large',
        },
    },
};

// Medium screens (md: 768px - 1023px)
export const Medium: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'medium',
        },
    },
};

// Small screens (sm: 640px - 767px)
export const Small: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'small',
        },
    },
};

// Mobile screens (xs: < 640px)
export const Mobile: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'mobile',
        },
    },
};

export const FourK: Story = {
    parameters: {
        viewport: {
            defaultViewport: 'fourK',
        },
    },
};

// Dark theme story (Desktop)
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

// Interactions

// Add to your existing stories
export const MobileMenuInteraction: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        // Test mobile menu interaction
        const menuButton = await canvas.findByRole('button', { name: /Toggle menu/i });
        await userEvent.click(menuButton);

        // Verify menu opens
        await canvas.findByRole('dialog');
    },
};

// States

// export const LoggedIn: Story = {
//     args: {
//         isLoggedIn: true,
//         user: {
//             name: 'John Doe',
//             email: 'john@example.com',
//             avatar: 'https://example.com/avatar.jpg',
//         },
//     },
//     play: async ({ canvasElement, args }) => {
//         const canvas = within(canvasElement);

//         // Test user menu
//         const userMenu = await canvas.findByRole('button', { name: /user menu/i });
//         await userEvent.click(userMenu);

//         // Test logout
//         const logoutButton = await canvas.findByRole('button', { name: /logout/i });
//         await userEvent.click(logoutButton);
//         await expect(args.onLogout).toHaveBeenCalled();
//     },
// };

export const Loading: Story = {
    args: {
        isLoading: true,
    },
};

// Renamed from Error to ErrorState to avoid conflict
export const ErrorState: Story = {
    args: {
        error: 'Failed to load user data',
    },
};

// // Mobile menu interaction test
// export const MobileMenu: Story = {
//     parameters: {
//         viewport: {
//             defaultViewport: 'mobile',
//         },
//     },
//     play: async ({ canvasElement, args }) => {
//         const canvas = within(canvasElement);

//         // Open menu
//         const menuButton = await canvas.findByRole('button', { name: /toggle menu/i });
//         await userEvent.click(menuButton);
//         await expect(args.onMenuToggle).toHaveBeenCalledWith(true);

//         // Verify menu is open
//         const menu = await canvas.findByRole('dialog');
//         await expect(menu).toBeVisible();

//         // Close menu
//         await userEvent.click(menuButton);
//         await expect(args.onMenuToggle).toHaveBeenCalledWith(false);
//     },
// };
