import type { Preview } from '@storybook/react';
import '../styles/globals.css'; // Adjust this to your actual CSS path
import '../styles/index.css'; // Adjust this to your actual CSS path

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
                mobile1: {
                    name: 'Mobile',
                    styles: {
                        width: '360px',
                        height: '640px',
                    },
                },
                tablet: {
                    name: 'Tablet',
                    styles: {
                        width: '768px',
                        height: '1024px',
                    },
                },
            },
        },
    },
};

export default preview;
