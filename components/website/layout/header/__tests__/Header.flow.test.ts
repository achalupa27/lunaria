import { test, expect } from '@playwright/test';

test('header authentication flow', async ({ page }) => {
    await page.goto('http://localhost:6006/iframe.html?id=website-layout-header--desktop');

    // Click login button
    await page.click('#login-button');

    // Verify auth modal appears
    await expect(page.locator('dialog[aria-label="Authentication"]')).toBeVisible();

    // Test sign up flow
    await page.click('#signup-button');
    await expect(page.locator('form[aria-label="Sign up form"]')).toBeVisible();
});
