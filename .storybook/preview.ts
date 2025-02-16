import type { Preview } from '@storybook/react';
import '../styles/globals.css';
import '../styles/index.css';

const preview: Preview = {
    parameters: {
        actions: { argTypes: { onClick: { action: 'clicked' } } },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        nextjs: {
            appDirectory: true,
        },
        themes: {
            default: 'light',
            list: [
                { name: 'light', class: 'light', color: '#ffffff' },
                { name: 'dark', class: 'dark', color: '#000000' },
            ],
        },
        viewport: {
            viewports: {
                mobile: {
                    name: 'Mobile (< 640px)',
                    styles: {
                        width: '320px',
                        height: '640px',
                    },
                },
                small: {
                    name: 'Small (sm: 640px)',
                    styles: {
                        width: '640px',
                        height: '960px',
                    },
                },
                medium: {
                    name: 'Medium (md: 768px)',
                    styles: {
                        width: '768px',
                        height: '1024px',
                    },
                },
                large: {
                    name: 'Large (lg: 1024px)',
                    styles: {
                        width: '1024px',
                        height: '768px',
                    },
                },
                desktop: {
                    name: 'Desktop (xl: 1280px)',
                    styles: {
                        width: '1280px',
                        height: '800px',
                    },
                },
                desktop2xl: {
                    name: 'Desktop (2xl: ≥1536px)',
                    styles: {
                        width: '1536px',
                        height: '960px',
                    },
                },
                fullHD: {
                    name: 'Full HD (1920x1080)',
                    styles: {
                        width: '1920px',
                        height: '1080px',
                    },
                },
                fourK: {
                    name: '4K (3840x2160)',
                    styles: {
                        width: '3840px',
                        height: '2160px',
                    },
                },
            },
        },
    },
};

export default preview;
