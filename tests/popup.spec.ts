import { test, expect } from '@playwright/test';

let iframe;
let emailField;

test.beforeEach(async ({ page }) => {
  await page.goto('https://static.digioh.com/html/hussain.html?digioh_conditions_monitor=1&boxqamode&FORCE_Box_253241');

  const iframeLocator = page.locator('iframe[title="Practice Quiz 2"]');
  await expect(iframeLocator).toBeVisible({ timeout: 50000 });

  iframe = page.frameLocator('iframe[title="Practice Quiz 2"]');
  emailField = iframe.getByRole('textbox', { name: 'Your Email' });
  await expect(emailField).toBeVisible({ timeout: 20000 });
});

test('Digioh box and field should be visible', async () => {
  // Assertions are already done in beforeEach
});

test('Email field should show validation errors', async () => {
  await iframe.getByRole('button', { name: 'Submit Modal Form' }).click();
  await expect(iframe.getByText('Your Email is required.')).toBeVisible({ timeout: 5000 });
  await new Promise(resolve => setTimeout(resolve, 1000));

  await emailField.fill('invalid-email');
  await iframe.getByRole('button', { name: 'Submit Modal Form' }).click();
  await expect(iframe.getByText('Your Email is in an invalid format.')).toBeVisible({ timeout: 5000 });
});

test('Valid email should show Thank You message and allow modal close', async () => {
  await emailField.fill('hussain@digioh.com');
  await iframe.getByRole('button', { name: 'Submit Modal Form' }).click();

  const thankYouMessage = iframe.getByText('Thank you');
  const closeButton = iframe.getByRole('button', { name: 'Close Modal' });

  await expect(thankYouMessage).toBeVisible({ timeout: 10000 });
  await expect(closeButton).toBeVisible({ timeout: 5000 });

  await closeButton.click();
  await expect(thankYouMessage).not.toBeVisible({ timeout: 5000 });
});
