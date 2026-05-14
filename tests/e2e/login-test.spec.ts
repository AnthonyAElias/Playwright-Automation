import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';
import { demoUser } from '../../src/utils/test-data';

test('opens the Playwright Practice Lab login page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.expectLoginButtonDisabled();
});

test('logs in with valid demo credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(demoUser.email, demoUser.password);
  await loginPage.expectDashboardLoaded();

  await page.waitForTimeout(3_000);
});
