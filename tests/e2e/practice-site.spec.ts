import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';

test('opens the Playwright Practice Lab login page', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.expectLoaded();
  await loginPage.expectLoginButtonDisabled();
});
