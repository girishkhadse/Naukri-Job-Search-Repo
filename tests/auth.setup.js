const { test: setup } = require('@playwright/test');
const fs = require('fs');
const { LoginPage } = require('../pages/LoginPage');

const AUTH_FILE = '.auth/user.json';

setup('login to Naukri and save session', async ({ page }) => {
  const { NAUKRI_USERNAME, NAUKRI_PASSWORD } = process.env;
  if (!NAUKRI_USERNAME || !NAUKRI_PASSWORD) {
    if (fs.existsSync(AUTH_FILE)) return; // reuse manually saved session
    throw new Error('Set NAUKRI_USERNAME/NAUKRI_PASSWORD in .env or run: npm run save-auth');
  }
  await new LoginPage(page).login(NAUKRI_USERNAME, NAUKRI_PASSWORD);
  fs.mkdirSync('.auth', { recursive: true });
  await page.context().storageState({ path: AUTH_FILE });
});
