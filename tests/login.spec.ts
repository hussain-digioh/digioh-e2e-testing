import { test, expect } from '@playwright/test';

const validEmail = process.env.LOGIN_EMAIL!;
const validPassword = process.env.LOGIN_PASSWORD!;
const loginURL = process.env.LOGIN_URL!;


test.beforeEach(async ({ page }) => {
  // Common setup: visit login page before each test
  await page.goto(loginURL);
});

test('Logo is visible on login page', async ({ page }) => {
  const logo = page.getByRole('img', { name: 'Digioh' }); 
  await expect(logo).toBeVisible();
});

test('Login button is visible and has expected color', async ({ page }) => {
  const loginButton = page.getByRole('button', { name: 'Login' });
  await expect(loginButton).toBeVisible();

  const bgColor = await loginButton.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(bgColor).toBe('rgb(44, 192, 136)');
});

test('Forgot Password link is visible on login page', async ({ page }) => {

  // Locate the "Forgot Password" link
  const forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password' });

  // Assert it is visible
  await expect(forgotPasswordLink).toBeVisible();
});

test('Shows error when submitting empty or invalid values', async ({ page }) => {
  const emailField = page.getByRole('textbox', { name: 'Email' });
  const passwordField = page.locator('input[name="Password"]');
  const loginButton = page.getByRole('button', { name: 'Login' });

  // Submit empty form
  await loginButton.click();

  // Wait for error message after reload
  const errorMessage = page.getByText('Error! Invalid login');
  await errorMessage.waitFor({ state: 'visible', timeout: 10000 });
  await expect(errorMessage).toBeVisible();

  // Try wrong credentials
  await emailField.fill('wrong@example.com');
  await passwordField.fill('wrongpassword');
  await loginButton.click();

  await page.waitForLoadState('networkidle');

  const dashboardHeading = page.getByRole('heading', { name: 'Current Boxes' });
  await expect(dashboardHeading).not.toBeVisible();
});


test('Successful login redirects to dashboard or root page', async ({ page }) => {
  const emailField = page.getByRole('textbox', { name: 'Email' });
  const passwordField = page.locator('input[name="Password"]');
  const loginButton = page.getByRole('button', { name: 'Login' });

  await emailField.fill(validEmail);
  await passwordField.fill(validPassword);
  await loginButton.click();

  // Wait for navigation/redirect after login
  await page.waitForURL(loginURL, { timeout: 100000 });

  await expect(page).toHaveURL(loginURL);

  // Wait for dashboard heading to appear after login
  const dashboardElement = page.getByRole('heading', { name: 'Current Boxes' });
  await dashboardElement.waitFor({ state: 'visible', timeout: 5000 });
  await expect(dashboardElement).toBeVisible();
});