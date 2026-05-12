import { expect, test } from '@playwright/test';

test('opens the Playwright Practice Lab login page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Playwright Practice Lab');
  await expect(page.getByTestId('login-page')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Playwright Practice Lab' })).toBeVisible();
  await expect(page.getByTestId('login-button')).toBeDisabled();
});
