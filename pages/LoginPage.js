class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.locator('#usernameField');
    this.password = page.locator('#passwordField');
    //this.loginBtn = page.locator('button[type="submit"]', { hasText: 'Login' });
    this.loginBtn = page.getByRole('button', { name: 'Login', exact: true });
  }

  async goto() {
    await this.page.goto('/nlogin/login', { waitUntil: 'domcontentloaded' });
  }

  async login(user, pass) {
    await this.goto();
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
    // Leaves /nlogin on success. If OTP/captcha appears, solve it manually in headed mode.
    await this.page.waitForURL((url) => !url.pathname.includes('nlogin'), { timeout: 60_000 });
  }
}
module.exports = { LoginPage };
