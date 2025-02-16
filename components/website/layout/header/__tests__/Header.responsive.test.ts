import { test, expect } from '@playwright/test';

test('header responsive behavior', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=website-layout-header--desktop');

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('#mobile-menu-button')).toBeVisible();
    await expect(page.locator('.desktop-nav')).not.toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(page.locator('#mobile-menu-button')).not.toBeVisible();
    await expect(page.locator('.desktop-nav')).toBeVisible();
});
