import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginPage: Locator;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly homePage: Locator;
  readonly homeHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = page.getByTestId('login-page');
    this.heading = page.getByRole('heading', { name: 'Playwright Practice Lab' });
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.loginButton = page.getByTestId('login-button');
    this.homePage = page.getByTestId('home-page');
    this.homeHeading = page.getByTestId('home-heading');
  }

  async goto() {
    await this.page.goto('./');
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle('Playwright Practice Lab');
    await expect(this.loginPage).toBeVisible();
    await expect(this.heading).toBeVisible();
  }

  async expectLoginButtonDisabled() {
    await expect(this.loginButton).toBeDisabled();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectDashboardLoaded() {
    await expect(this.homePage).toBeVisible();
    await expect(this.homeHeading).toHaveText('Automation Dashboard');
  }
}
