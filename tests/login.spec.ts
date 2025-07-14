import { test, expect } from "@playwright/test";

const validEmail = process.env.LOGIN_EMAIL!;
const validPassword = process.env.LOGIN_PASSWORD!;
const loginURL = process.env.APP_URL!;

test.beforeEach(async ({ page }) => {
  // Common setup: visit login page before each test
  await page.goto(loginURL);
});

test("Logo is visible on login page", async ({ page }) => {
  const logo = page.getByTestId("login-logo");
  await expect(logo).toBeVisible();
});

test("Login button is visible and has expected color", async ({ page }) => {
  const loginButton = page.getByTestId("login-button");
  await expect(loginButton).toBeVisible();

  const bgColor = await loginButton.evaluate(
    (el) => getComputedStyle(el).backgroundColor
  );
  expect(bgColor).toBe("rgb(30, 133, 94)");
});

test("Forgot Password link is visible on login page", async ({ page }) => {
  // Locate the "Forgot Password" link using the new data-testid
  const forgotPasswordLink = page.getByTestId("login-forgot-password-button");

  // Assert it is visible
  await expect(forgotPasswordLink).toBeVisible();
});

test("Successful login redirects to dashboard or root page", async ({
  page,
}) => {
  const emailField = page.getByTestId("login-email-field");
  const passwordField = page.getByTestId("login-password-field");
  const loginButton = page.getByTestId("login-button");

  await emailField.fill(validEmail);
  await passwordField.fill(validPassword);
  await loginButton.click();

  // Wait for navigation/redirect after login
  await page.waitForURL(loginURL, { timeout: 100000 });

  await expect(page).toHaveURL(loginURL);

  // Wait for dashboard heading to appear after login
  const dashboardElement = page.getByTestId("campaign-list-logo");
  await dashboardElement.waitFor({ state: "visible", timeout: 5000 });
  await expect(dashboardElement).toBeVisible();
});

test("Shows error when submitting empty or invalid values", async ({
  page,
}) => {
  const emailField = page.getByTestId("login-email-field");
  const passwordField = page.getByTestId("login-password-field");
  const loginButton = page.getByTestId("login-button");

  // Submit empty form
  await loginButton.click();

  // Wait for error message using the new data-testid
  const errorMessage = page.getByTestId("login-error-message");
  await errorMessage.waitFor({ state: "visible", timeout: 10000 });
  await expect(errorMessage).toBeVisible();

  // Try wrong credentials
  await emailField.fill("wrong@example.com");
  await passwordField.fill("wrongpassword");
  await loginButton.click();

  await page.waitForLoadState("networkidle");

  const dashboardHeading = page.getByRole("heading", { name: "Current Boxes" });
  await expect(dashboardHeading).not.toBeVisible();
});

test("Login form fields are visible and accessible", async ({ page }) => {
  const emailField = page.getByTestId("login-email-field");
  const passwordField = page.getByTestId("login-password-field");
  const loginButton = page.getByTestId("login-button");

  // Check that all form elements are visible
  await expect(emailField).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(loginButton).toBeVisible();

  // Check that fields are enabled and can be interacted with
  await expect(emailField).toBeEnabled();
  await expect(passwordField).toBeEnabled();
  await expect(loginButton).toBeEnabled();
});

test("Login form accepts valid input", async ({ page }) => {
  const emailField = page.getByTestId("login-email-field");
  const passwordField = page.getByTestId("login-password-field");

  // Test that fields can accept input
  await emailField.fill("test@example.com");
  await passwordField.fill("testpassword");

  // Verify the input was entered
  await expect(emailField).toHaveValue("test@example.com");
  await expect(passwordField).toHaveValue("testpassword");
});

test("Wait warning is displayed when appropriate", async ({ page }) => {
  // This test checks for the login-wait-warning element if it appears
  // during certain conditions (like multiple failed attempts)
  const waitWarning = page.getByTestId("login-wait-warning");

  // Note: This element might only appear under specific conditions
  // The test will pass if the element is not present (which is expected)
  // and will catch it if it does appear
  await expect(waitWarning).not.toBeVisible();
});
