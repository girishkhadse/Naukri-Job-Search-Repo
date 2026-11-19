class ProfilePage {
  constructor(page) {
    this.page = page;
    this.name = page.locator('.hdn-nme, .name').first();
    this.headline = page.locator('.resumeHeadline .widgetCont, #lazyResumeHead .widgetCont').first();
    this.completion = page.locator('.progress-text, .pro-compl-text').first();
  }

  async goto() {
    await this.page.goto('/mnjuser/profile', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle').catch(() => {});
  }

  async getSummary() {
    return {
      url: this.page.url(),
      name: (await this.name.textContent({ timeout: 10_000 }).catch(() => ''))?.trim(),
      headline: (await this.headline.textContent({ timeout: 5_000 }).catch(() => ''))?.trim(),
      completion: (await this.completion.textContent({ timeout: 5_000 }).catch(() => ''))?.trim(),
    };
  }
}
module.exports = { ProfilePage };
