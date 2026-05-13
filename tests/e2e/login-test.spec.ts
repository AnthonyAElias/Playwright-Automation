import { expect, test } from '@playwright/test';

test('opens the Playwright Practice Lab login page', async ({ page }) => {
  await page.goto('./');

  await expect(page).toHaveTitle('Playwright Practice Lab');
  await expect(page.getByTestId('login-page')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Playwright Practice Lab' })).toBeVisible();
  await expect(page.getByTestId('login-button')).toBeDisabled();
});

test('logs in with valid demo credentials', async ({ page }) => {
  await page.goto('./');

  await page.getByTestId('email-input').fill('demo@example.com');
  await page.getByTestId('password-input').fill('playwright');

  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('home-page')).toBeVisible();
  await expect(page.getByTestId('home-heading')).toHaveText('Automation Dashboard');

  await page.waitForTimeout(3_000);
});
