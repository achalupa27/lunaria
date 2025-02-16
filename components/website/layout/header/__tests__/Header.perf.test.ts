import { test, expect } from '@playwright/test';

test('header performance', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=website-layout-header--desktop');

    const metrics = await page.evaluate(() => ({
        FCP: performance.getEntriesByName('first-contentful-paint')[0].startTime,
        LCP: performance.getEntriesByName('largest-contentful-paint')[0].startTime,
    }));

    expect(metrics.FCP).toBeLessThan(1000);
    expect(metrics.LCP).toBeLessThan(2500);
});
