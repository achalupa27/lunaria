import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './components',
    use: {
        baseURL: 'http://localhost:6006',
    },
    webServer: {
        command: 'npm run storybook',
        url: 'http://localhost:6006',
        reuseExistingServer: true,
    },
    projects: [
        {
            name: 'a11y',
            testMatch: /.*\.a11y\.test\.ts/,
        },
        {
            name: 'snapshots',
            testMatch: /.*\.snapshot\.ts/,
        },
        {
            name: 'performance',
            testMatch: /.*\.perf\.ts/,
        },
        {
            name: 'responsive',
            testMatch: /.*\.responsive\.ts/,
        },
        {
            name: 'flows',
            testMatch: /.*\.flow\.ts/,
        },
        {
            name: 'e2e',
            testMatch: /.*\.e2e\.ts/,
            use: {
                baseURL: 'http://localhost:3000',
            },
        },
        {
            name: 'visual',
            testMatch: /.*\.visual\.test\.ts/,
        },
    ],
});
