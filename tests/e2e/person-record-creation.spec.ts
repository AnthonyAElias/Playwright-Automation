import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';
import { demoUser } from '../../src/utils/test-data';

const pauseForDemo = async (page: Page) => {
  await page.waitForTimeout(2_500);
};

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

test('navigates to the Intake page', async ({ page }) => {
const loginPage = new LoginPage(page);

await loginPage.goto();
await loginPage.login(demoUser.email, demoUser.password);
await loginPage.expectDashboardLoaded();

// Find the Intake Link/button on the dashboard and click it.
// Hint: try getByRole('link, { name : 'Intake'}) first

await page.getByTestId('nav-intake').click();

// Assertion to the test that proves the navigation worked
await expect(page.getByRole('heading', { name: 'Intake'})).toBeVisible();

await page.waitForTimeout(6_000);

});

// Decided to create a helper function that encapsulates all of the previous steps

async function loginAndGoToIntake(page: Page){
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(demoUser.email, demoUser.password);
    await loginPage.expectDashboardLoaded();

    await page.getByTestId('nav-intake').click();

    await expect(page.getByRole('heading', { name: 'Intake'})).toBeVisible();
}



test('creates a person record from Intake', async ({ page }) => {
  await loginAndGoToIntake(page);
  await pauseForDemo(page);

  const uniqueId = Date.now();

  const person = {
    firstName: `TestFirst${uniqueId}`,
    lastName: `TestLast${uniqueId}`,
    email: `test.person.${uniqueId}@example.com`,
    address: `${uniqueId} Sample Lane`,
    ssn: Math.floor(100000000 + Math.random() * 900000000).toString(),
    psl: 'T1',
    applicantType: 'Contractor',
    anticipatedStartDate: '2026-05-24'

  };
  // fill out fields

    await page.getByTestId('first-name-input').fill(person.firstName);
    await pauseForDemo(page);

    await page.getByTestId('last-name-input').fill(person.lastName);
    await page.getByTestId('intake-email-input').fill(person.email);
    await page.getByTestId('address-input').fill(person.address);
    await page.getByTestId('psl-select').selectOption(person.psl);
    await page.getByTestId('ssn-input').fill(person.ssn);
    await page.getByTestId('applicant-type-select').selectOption(person.applicantType);
    await page.getByTestId('anticipated-start-date-input').fill(person.anticipatedStartDate);   
    await page.getByTestId('skip-applicant-intake-yes').check();
    await pauseForDemo(page);

  // submit
    await page.getByTestId('submit-intake-button').click();
    await pauseForDemo(page);

  // assert the person record was created


    await expect(page.getByText('Person record created')).toBeVisible();

    const createdPersonRow = page.getByTestId('person-record-1');
    await expect(createdPersonRow).toBeVisible();
    await expect(createdPersonRow).toContainText(person.firstName);
    await expect(createdPersonRow).toContainText(person.lastName);
    await pauseForDemo(page);

    await createdPersonRow.click();

    await expect(page.getByTestId('workflow-status-value')).toBeVisible();

    await pauseForDemo(page);
});
