import { test, expect } from '@playwright/test';

// Mark these tests as visual tests
test.describe('@visual header snapshots', () => {
    // Take snapshots for each viewport size
    test('header in different viewports', async ({ page }) => {
        const viewports = [
            { width: 375, height: 667, name: 'mobile' },
            { width: 768, height: 1024, name: 'tablet' },
            { width: 1024, height: 768, name: 'desktop' },
            { width: 1920, height: 1080, name: 'fullhd' },
        ];

        for (const viewport of viewports) {
            // Set viewport size
            await page.setViewportSize(viewport);

            // Load the story
            await page.goto('http://localhost:6006/iframe.html?id=website-layout-header--desktop');

            // Take screenshot
            const screenshot = await page.screenshot();

            // Compare with baseline
            expect(screenshot).toMatchSnapshot(`header-${viewport.name}.png`);
        }
    });

    // Test dark mode
    test('header in dark mode', async ({ page }) => {
        await page.goto('http://localhost:6006/iframe.html?id=website-layout-header--dark-theme');
        expect(await page.screenshot()).toMatchSnapshot('header-dark.png');
    });

    // Test with menu open
    test('header with mobile menu open', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('http://localhost:6006/iframe.html?id=website-layout-header--mobile');

        // Open mobile menu
        await page.click('button[aria-label="Toggle menu"]');
        await page.waitForSelector('[role="dialog"]');

        expect(await page.screenshot()).toMatchSnapshot('header-mobile-menu-open.png');
    });
});
