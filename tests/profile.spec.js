const { test, expect } = require('@playwright/test');
const { ProfilePage } = require('../pages/ProfilePage');

test('profile page loads for logged-in user', async ({ page }) => {
  const profile = new ProfilePage(page);
  await profile.goto();
  const summary = await profile.getSummary();
  console.log('Profile summary:', summary);

  expect(page.url()).toContain('/mnjuser/profile');
  expect(summary.name, 'profile name should be visible').toBeTruthy();
});
