import { test, expect } from "@playwright/test";

const appURL = process.env.APP_URL!;
const resetPasswordURL = `${appURL}/login/ResetPassword?token=test-token`;

test.beforeEach(async ({ page }) => {
  // Common setup: visit reset password page before each test
  await page.goto(resetPasswordURL);
});

//Cannot run tests as we cannot reset password without a valid token.

test("Logo is visible on reset password page", async ({ page }) => {
  const logo = page.getByTestId("login-logo");
  await expect(logo).toBeVisible();
});

// test('Reset password heading is visible', async ({ page }) => {
//   const heading = page.getByTestId('reset-password-heading');
//   await expect(heading).toBeVisible();
// });

// test('Password field is visible and accessible', async ({ page }) => {
//   const passwordField = page.getByTestId('reset-password-password-field');

//   // Check that password field is visible and enabled
//   await expect(passwordField).toBeVisible();
//   await expect(passwordField).toBeEnabled();
// });

// test('Re-type password field is visible and accessible', async ({ page }) => {
//   const reTypePasswordField = page.getByTestId('reset-password-re-type-password-field');

//   // Check that re-type password field is visible and enabled
//   await expect(reTypePasswordField).toBeVisible();
//   await expect(reTypePasswordField).toBeEnabled();
// });

// test('Submit button is visible and accessible', async ({ page }) => {
//   const submitButton = page.getByTestId('reset-password-submit-button');

//   // Check that submit button is visible and enabled
//   await expect(submitButton).toBeVisible();
//   await expect(submitButton).toBeEnabled();
// });

// test('Password fields accept valid input', async ({ page }) => {
//   const passwordField = page.getByTestId('reset-password-password-field');
//   const reTypePasswordField = page.getByTestId('reset-password-re-type-password-field');

//   // Test that fields can accept input
//   await passwordField.fill('newpassword123');
//   await reTypePasswordField.fill('newpassword123');

//   // Verify the input was entered
//   await expect(passwordField).toHaveValue('newpassword123');
//   await expect(reTypePasswordField).toHaveValue('newpassword123');
// });

// test('Submit button triggers form submission', async ({ page }) => {
//   const passwordField = page.getByTestId('reset-password-password-field');
//   const reTypePasswordField = page.getByTestId('reset-password-re-type-password-field');
//   const submitButton = page.getByTestId('reset-password-submit-button');

//   // Fill in password fields
//   await passwordField.fill('newpassword123');
//   await reTypePasswordField.fill('newpassword123');

//   // Click submit button
//   await submitButton.click();

//   // Wait for potential navigation or response
//   await page.waitForLoadState('networkidle');
// });

// test('Error message appears for mismatched passwords', async ({ page }) => {
//   const passwordField = page.getByTestId('reset-password-password-field');
//   const reTypePasswordField = page.getByTestId('reset-password-re-type-password-field');
//   const submitButton = page.getByTestId('reset-password-submit-button');

//   // Submit with mismatched passwords
//   await passwordField.fill('password123');
//   await reTypePasswordField.fill('differentpassword');
//   await submitButton.click();

//   // Wait for error message
//   const errorMessage = page.getByTestId('reset-password-error-message');
//   await errorMessage.waitFor({ state: 'visible', timeout: 10000 });
//   await expect(errorMessage).toBeVisible();
// });

// test('Error message appears for empty password fields', async ({ page }) => {
//   const submitButton = page.getByTestId('reset-password-submit-button');

//   // Submit without entering passwords
//   await submitButton.click();

//   // Wait for error message
//   const errorMessage = page.getByTestId('reset-password-error-message');
//   await errorMessage.waitFor({ state: 'visible', timeout: 10000 });
//   await expect(errorMessage).toBeVisible();
// });

// test('Success message appears for valid password reset', async ({ page }) => {
//   const passwordField = page.getByTestId('reset-password-password-field');
//   const reTypePasswordField = page.getByTestId('reset-password-re-type-password-field');
//   const submitButton = page.getByTestId('reset-password-submit-button');

//   // Submit with matching passwords
//   await passwordField.fill('newpassword123');
//   await reTypePasswordField.fill('newpassword123');
//   await submitButton.click();

//   // Wait for success message
//   const successMessage = page.getByTestId('reset-password-success-message');
//   await successMessage.waitFor({ state: 'visible', timeout: 10000 });
//   await expect(successMessage).toBeVisible();
// });

// test('Password fields are properly masked', async ({ page }) => {
//   const passwordField = page.getByTestId('reset-password-password-field');
//   const reTypePasswordField = page.getByTestId('reset-password-re-type-password-field');

//   // Fill in password fields
//   await passwordField.fill('secretpassword');
//   await reTypePasswordField.fill('secretpassword');

//   // Check that password fields have type="password" for security
//   await expect(passwordField).toHaveAttribute('type', 'password');
//   await expect(reTypePasswordField).toHaveAttribute('type', 'password');
// });

// test('All form elements are properly positioned', async ({ page }) => {
//   const logo = page.getByTestId('reset-password-logo');
//   const heading = page.getByTestId('reset-password-heading');
//   const passwordField = page.getByTestId('reset-password-password-field');
//   const reTypePasswordField = page.getByTestId('reset-password-re-type-password-field');
//   const submitButton = page.getByTestId('reset-password-submit-button');

//   // Check that all elements are visible and properly rendered
//   await expect(logo).toBeVisible();
//   await expect(heading).toBeVisible();
//   await expect(passwordField).toBeVisible();
//   await expect(reTypePasswordField).toBeVisible();
//   await expect(submitButton).toBeVisible();
// });

// test('Form validation for weak password', async ({ page }) => {
//   const passwordField = page.getByTestId('reset-password-password-field');
//   const reTypePasswordField = page.getByTestId('reset-password-re-type-password-field');
//   const submitButton = page.getByTestId('reset-password-submit-button');

//   // Submit with weak password (too short)
//   await passwordField.fill('123');
//   await reTypePasswordField.fill('123');
//   await submitButton.click();

//   // Wait for error message
//   const errorMessage = page.getByTestId('reset-password-error-message');
//   await errorMessage.waitFor({ state: 'visible', timeout: 10000 });
//   await expect(errorMessage).toBeVisible();
// });
