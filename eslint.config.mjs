import nextPlugin from '@next/eslint-plugin-next';
import storybookPlugin from '@storybook/eslint-plugin-storybook';

export default [
    {
        plugins: {
            '@next/next': nextPlugin,
            'storybook': storybookPlugin,
        },
        extends: ['plugin:@next/next/recommended', 'plugin:storybook/recommended'],
        rules: {
            // Add any custom rules here
        },
    },
];
