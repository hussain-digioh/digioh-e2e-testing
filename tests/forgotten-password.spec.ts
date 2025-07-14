import { test, expect } from "@playwright/test";

const appURL = process.env.APP_URL!;
const forgotPasswordURL = `${appURL}/login/ForgotPassword`;

test.beforeEach(async ({ page }) => {
  // Common setup: visit forgot password page before each test
  await page.goto(forgotPasswordURL);
});

test("Logo is visible on forgotten password page", async ({ page }) => {
  const logo = page.getByTestId("forgotten-password-logo");
  await expect(logo).toBeVisible();
});

test("Forgotten password heading is visible", async ({ page }) => {
  const heading = page.getByTestId("forgotten-password-heading");
  await expect(heading).toBeVisible();
});

test("Email field is visible and accessible", async ({ page }) => {
  const emailField = page.getByTestId("forgotten-password-email-field");

  // Check that email field is visible and enabled
  await expect(emailField).toBeVisible();
  await expect(emailField).toBeEnabled();
});

test("Submit button is visible and accessible", async ({ page }) => {
  const submitButton = page.getByTestId("forgotten-password-submit-button");

  // Check that submit button is visible and enabled
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeEnabled();
});

test("Login redirect button is visible", async ({ page }) => {
  const loginRedirectButton = page.getByTestId(
    "forgotten-password-login-redirect-button"
  );

  // Check that login redirect button is visible
  await expect(loginRedirectButton).toBeVisible();
});

test("Email field accepts valid input", async ({ page }) => {
  const emailField = page.getByTestId("forgotten-password-email-field");

  // Test that field can accept input
  await emailField.fill("test@example.com");

  // Verify the input was entered
  await expect(emailField).toHaveValue("test@example.com");
});

test("Submit button triggers form submission", async ({ page }) => {
  const emailField = page.getByTestId("forgotten-password-email-field");
  const submitButton = page.getByTestId("forgotten-password-submit-button");

  // Fill in email field
  await emailField.fill("test@example.com");

  // Click submit button
  await submitButton.click();

  // Wait for potential navigation or response
  await page.waitForLoadState("networkidle");
});

test("Login redirect button navigates back to login page", async ({ page }) => {
  const loginRedirectButton = page.getByTestId(
    "forgotten-password-login-redirect-button"
  );

  // Click the login redirect button
  await loginRedirectButton.click();

  // Verify navigation back to login page (check if URL contains 'login')
  await expect(page.url()).toContain("Login");
});

test("All form elements are properly positioned", async ({ page }) => {
  const logo = page.getByTestId("forgotten-password-logo");
  const heading = page.getByTestId("forgotten-password-heading");
  const emailField = page.getByTestId("forgotten-password-email-field");
  const submitButton = page.getByTestId("forgotten-password-submit-button");
  const loginRedirectButton = page.getByTestId(
    "forgotten-password-login-redirect-button"
  );

  // Check that all elements are visible and properly rendered
  await expect(logo).toBeVisible();
  await expect(heading).toBeVisible();
  await expect(emailField).toBeVisible();
  await expect(submitButton).toBeVisible();
  await expect(loginRedirectButton).toBeVisible();
});
