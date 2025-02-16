import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

// Run accessibility tests for all Header stories
test.describe('Header Accessibility Tests', () => {
    test('should pass accessibility tests for all viewports', async ({ page }) => {
        // Navigate to each Header story
        const viewports = ['FourK', 'FullHD', 'Desktop2XL', 'Desktop', 'Large', 'Medium', 'Small', 'Mobile'];

        for (const viewport of viewports) {
            // Go to the story
            await page.goto(`http://localhost:6006/iframe.html?id=website-layout-header--${viewport.toLowerCase()}`);

            // Run accessibility scan
            const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

            // Expect no violations
            expect(accessibilityScanResults.violations).toHaveLength(0);
        }
    });

    test('should pass accessibility tests in dark mode', async ({ page }) => {
        // Go to dark theme story
        await page.goto(`http://localhost:6006/iframe.html?id=website-layout-header--dark-theme`);

        // Run accessibility scan
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

        // Expect no violations
        expect(accessibilityScanResults.violations).toHaveLength(0);
    });
});
