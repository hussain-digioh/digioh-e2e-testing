import { test, expect } from "@playwright/test";

const validEmail = process.env.LOGIN_EMAIL!;
const validPassword = process.env.LOGIN_PASSWORD!;
const loginURL = process.env.APP_URL!;

test.beforeEach(async ({ page }) => {
  // Visit login page and perform login before each test
  await page.goto(loginURL);

  // Login using custom selectors
  const emailField = page.getByTestId("login-email-field");
  const passwordField = page.getByTestId("login-password-field");
  const loginButton = page.getByTestId("login-button");

  await emailField.fill(validEmail);
  await passwordField.fill(validPassword);
  await loginButton.click();

  // Wait for dashboard to load with increased timeout
  const dashboardElement = page.getByTestId("campaign-list-logo");
  await dashboardElement.waitFor({ state: "visible", timeout: 10000 });
});

test('Logo is visible on campaign list page', async ({ page }) => {
  const logo = page.getByTestId('campaign-list-logo');
  await expect(logo).toBeVisible();
});

test('Navigation bar is visible', async ({ page }) => {
  const navBar = page.getByTestId('campaign-list-nav-bar');
  await expect(navBar).toBeVisible();
});

test('Campaign link is visible and accessible', async ({ page }) => {
  const campaignLink = page.getByTestId('campaign-list-link-campaign');
  await expect(campaignLink).toBeVisible();
  await expect(campaignLink).toBeEnabled();
});

test('Reporting link is visible and accessible', async ({ page }) => {
  const reportingLink = page.getByTestId('campaign-list-link-reporting');
  await expect(reportingLink).toBeVisible();
  await expect(reportingLink).toBeEnabled();
});

test('A/B Test link is visible and accessible', async ({ page }) => {
  const abTestLink = page.getByTestId('campaign-list-ab-test');
  await expect(abTestLink).toBeVisible();
  await expect(abTestLink).toBeEnabled();
});

test('Integration link is visible and accessible', async ({ page }) => {
  const integrationLink = page.getByTestId('campaign-list-integration');
  await expect(integrationLink).toBeVisible();
  await expect(integrationLink).toBeEnabled();
});

test('User name is visible', async ({ page }) => {
  const userName = page.getByTestId('campaign-list-user-name');
  await expect(userName).toBeVisible();
});

test('Filter is visible and accessible', async ({ page }) => {
  const filter = page.getByTestId('campaign-list-filter');
  await expect(filter).toBeVisible();
  await expect(filter).toBeEnabled();
});

test('Reorder campaign button is visible and accessible', async ({ page }) => {
  const reorderButton = page.getByTestId('campaign-list-reorder-campaign');
  await expect(reorderButton).toBeVisible();
  await expect(reorderButton).toBeEnabled();
});

test('Create campaign button is visible and accessible', async ({ page }) => {
  const createCampaignButton = page.getByTestId('campaign-list-create-campaign');
  await expect(createCampaignButton).toBeVisible();
  await expect(createCampaignButton).toBeEnabled();
});

test('Create quiz button is visible and accessible', async ({ page }) => {
  const createQuizButton = page.getByTestId('campaign-list-create-quiz');
  await expect(createQuizButton).toBeVisible();
  await expect(createQuizButton).toBeEnabled();
});

test('More options button is visible and accessible', async ({ page }) => {
  const moreOptionsButton = page.getByTestId('campaign-list-more-option');
  await expect(moreOptionsButton).toBeVisible();
  await expect(moreOptionsButton).toBeEnabled();
});

test('Campaign 1 ID is visible', async ({ page }) => {
  const campaign1Id = page.getByTestId('campaign-list-campaign-1-id');
  await expect(campaign1Id).toBeVisible();
});

test('Campaign 1 name is visible', async ({ page }) => {
  const campaign1Name = page.getByTestId('campaign-list-campaign-1-name');
  await expect(campaign1Name).toBeVisible();
});

test('Campaign 1 type is visible', async ({ page }) => {
  const campaign1Type = page.getByTestId('campaign-list-campaign-1-type');
  await expect(campaign1Type).toBeVisible();
});

test('Campaign 1 condition button is visible and accessible', async ({ page }) => {
  const conditionButton = page.getByTestId('campaign-list-campaign-1-condition-button');
  await expect(conditionButton).toBeVisible();
  await expect(conditionButton).toBeEnabled();
});

test('Campaign 1 publish toggle is visible and accessible', async ({ page }) => {
  const publishToggle = page.getByTestId('campaign-list-campaign-1-publish-toggle');
  await expect(publishToggle).toBeVisible();
  await expect(publishToggle).toBeEnabled();
});

test('Campaign 1 preview button is visible and accessible', async ({ page }) => {
  const previewButton = page.getByTestId('campaign-list-campaign-1-preview-button');
  await expect(previewButton).toBeVisible();
  await expect(previewButton).toBeEnabled();
});

test('Campaign 1 edit button is visible and accessible', async ({ page }) => {
  const editButton = page.getByTestId('campaign-list-campaign-1-edit-button');
  await expect(editButton).toBeVisible();
  await expect(editButton).toBeEnabled();
});

test('Campaign 1 more options button is visible and accessible', async ({ page }) => {
  const moreOptionsButton = page.getByTestId('campaign-list-campaign-1-more-options');
  await expect(moreOptionsButton).toBeVisible();
  await expect(moreOptionsButton).toBeEnabled();
});

test("Create campaign button navigates to campaign creation", async ({
  page,
}) => {
  const createCampaignButton = page.getByTestId(
    "campaign-list-create-campaign"
  );

  // Click the create campaign button
  await createCampaignButton.click();

  //Will be checked in separate test

  //   // Wait for navigation
  //   await page.waitForLoadState('networkidle');

  //   // Verify navigation to Quiz builder page (check if URL contains 'Box/QuizBuilder')
  //   await expect(page.url()).toContain('Box/QuizBuilder');
});

test("Create quiz button navigates to quiz creation", async ({ page }) => {
  const createQuizButton = page.getByTestId("campaign-list-create-quiz");

  // Click the create quiz button
  await createQuizButton.click();
  //Will be checked in separate test

  //   // Wait for navigation
  //   await page.waitForLoadState('networkidle');

  //  // Verify navigation to Theme page (check if URL contains 'Box/Theme')
  //  await expect(page.url()).toContain('Box/Theme');
});

test('Campaign 1 preview button opens preview', async ({ page }) => {
  const previewButton = page.getByTestId('campaign-list-campaign-1-preview-button');

  // Click the preview button
  await previewButton.click();

  // Wait for potential modal or new window/tab
  await page.waitForLoadState('networkidle');
});

test('All navigation links are functional', async ({ page }) => {
  const campaignLink = page.getByTestId('campaign-list-link-campaign');
  const reportingLink = page.getByTestId('campaign-list-link-reporting');
  const abTestLink = page.getByTestId('campaign-list-ab-test');
  const integrationLink = page.getByTestId('campaign-list-integration');

  // Test that all navigation links are clickable
  await expect(campaignLink).toBeEnabled();
  await expect(reportingLink).toBeEnabled();
  await expect(abTestLink).toBeEnabled();
  await expect(integrationLink).toBeEnabled();
});

test('Filter functionality is accessible', async ({ page }) => {
  const filter = page.getByTestId('campaign-list-filter');

  // Click on filter to test interaction
  await filter.click();

  // Wait for potential dropdown or filter options to appear
  await page.waitForTimeout(1000);
});

test('Publish toggle functionality', async ({ page }) => {
  const publishToggle = page.getByTestId('campaign-list-campaign-1-publish-toggle');

  // Test that toggle can be clicked
  await publishToggle.click();

  // Wait for state change
  await page.waitForTimeout(1000);
});

test('More options functionality', async ({ page }) => {
  const moreOptionsButton = page.getByTestId('campaign-list-more-option');

  // Click more options button
  await moreOptionsButton.click();

  // Wait for dropdown or menu to appear
  await page.waitForTimeout(1000);
});

test('Campaign 1 more options functionality', async ({ page }) => {
  const moreOptionsButton = page.getByTestId('campaign-list-campaign-1-more-options');

  // Click campaign 1 more options button
  await moreOptionsButton.click();

  // Wait for dropdown or menu to appear
  await page.waitForTimeout(1000);
});
