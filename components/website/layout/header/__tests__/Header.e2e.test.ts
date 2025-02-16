import { test, expect } from '@playwright/test';

test.describe('Header End-to-End Tests', () => {
    test('complete authentication flow', async ({ page }) => {
        // Start from home page
        await page.goto('/');

        // 1. Initial state check
        await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /user menu/i })).not.toBeVisible();

        // 2. Click login
        await page.getByRole('button', { name: /login/i }).click();

        // 3. Fill login form
        await page.getByLabel('Email').fill('test@example.com');
        await page.getByLabel('Password').fill('password123');
        await page.getByRole('button', { name: /sign in/i }).click();

        // 4. Verify logged in state
        await expect(page.getByRole('button', { name: /user menu/i })).toBeVisible();
        await expect(page.getByRole('button', { name: /login/i })).not.toBeVisible();

        // 5. Test user menu
        await page.getByRole('button', { name: /user menu/i }).click();
        await expect(page.getByRole('menu')).toBeVisible();

        // 6. Logout
        await page.getByRole('button', { name: /logout/i }).click();

        // 7. Verify logged out state
        await expect(page.getByRole('button', { name: /login/i })).toBeVisible();
    });

    test('navigation flow', async ({ page }) => {
        await page.goto('/');

        // 1. Desktop navigation
        await page.setViewportSize({ width: 1024, height: 768 });
        await expect(page.getByRole('navigation')).toBeVisible();
        await page.getByRole('link', { name: /about/i }).click();
        await expect(page).toHaveURL('/about');

        // 2. Mobile navigation
        await page.setViewportSize({ width: 375, height: 667 });
        await page.getByRole('button', { name: /toggle menu/i }).click();
        await expect(page.getByRole('dialog')).toBeVisible();
        await page.getByRole('link', { name: /contact/i }).click();
        await expect(page).toHaveURL('/contact');
    });

    test('theme switching', async ({ page }) => {
        await page.goto('/');

        // 1. Default theme
        await expect(page.locator('html')).toHaveAttribute('class', /light/);

        // 2. Switch to dark mode
        await page.getByRole('button', { name: /toggle theme/i }).click();
        await expect(page.locator('html')).toHaveAttribute('class', /dark/);

        // 3. Verify theme persists across navigation
        await page.getByRole('link', { name: /about/i }).click();
        await expect(page.locator('html')).toHaveAttribute('class', /dark/);
    });
});
