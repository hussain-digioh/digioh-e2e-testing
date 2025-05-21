import { test, expect } from '@playwright/test';

const validEmail = process.env.LOGIN_EMAIL!;
const validPassword = process.env.LOGIN_PASSWORD!;
const loginURL = process.env.LOGIN_URL!;

test.beforeEach(async ({ page }) => {
  // Visit login page and perform login before each test
  await page.goto(loginURL);
  
  // Login
  const emailField = page.getByRole('textbox', { name: 'Email' });
  const passwordField = page.locator('input[name="Password"]');
  const loginButton = page.getByRole('button', { name: 'Login' });

  await emailField.fill(validEmail);
  await passwordField.fill(validPassword);
  await loginButton.click();

  // Wait for dashboard to load with increased timeout
  const dashboardElement = page.getByRole('heading', { name: 'Current Boxes' });
  await dashboardElement.waitFor({ state: 'visible', timeout: 10000 });
});

test('Create New Box button is present and redirects to themes page', async ({ page }) => {
  // Verify Create New Box button is present
  const createBoxButton = page.getByRole('button', { name: 'Create New Box' });
  await expect(createBoxButton).toBeVisible({ timeout: 10000 });

  // Click on Create New Box button
  await createBoxButton.click();

  expect(page.url()).toContain('/Box/Theme');

});

test('Create New Quiz button is present and redirects to Quiz Builder', async ({ page }) => {
  // Verify Create New Quiz button is present
  const createQuizButton = page.getByRole('button', { name: 'Create New Quiz' });
  await expect(createQuizButton).toBeVisible({ timeout: 10000 });

  // Click on Create New Quiz button
  await createQuizButton.click();
  expect(page.url()).toContain('/Box/QuizBuilder');

});

test('Navigation banner and links are visible', async ({ page }) => {
  // Wait for the page to be fully loaded
  await page.waitForLoadState('networkidle');

  // Check if banner exists
  const banner = page.getByRole('banner');
  await expect(banner).toBeVisible({ timeout: 10000 });

  // Verify navigation links with increased timeout
  const Boxes = page.getByRole('button', { name: 'Boxes', exact: true });
  const ABT = page.getByRole('button', { name: 'A/B Testing' });
  const Integrations = page.getByRole('button', { name: 'Integrations' });

  await expect(Boxes).toBeVisible({ timeout: 10000 });
  await expect(ABT).toBeVisible({ timeout: 10000 });
  await expect(Integrations).toBeVisible({ timeout: 10000 });
});
