const slug = (s) => String(s).trim().toLowerCase().replace(/\s+/g, '-');

class JobSearchPage {
  constructor(page) {
    this.page = page;
    this.cards = page.locator('.srp-jobtuple-wrapper');
  }

  buildPath({ keyword, location, experience }, pageNo = 1, jobAgeDays) {
    let path = `/${slug(keyword)}-jobs`;
    if (location) path += `-in-${slug(location)}`;
    if (pageNo > 1) path += `-${pageNo}`;
    const qs = new URLSearchParams();
    if (experience !== undefined) qs.set('experience', experience);
    if (jobAgeDays) qs.set('jobAge', jobAgeDays);
    const q = qs.toString();
    return q ? `${path}?${q}` : path;
  }

  async open(search, pageNo, jobAgeDays) {
    await this.page.goto(this.buildPath(search, pageNo, jobAgeDays), { waitUntil: 'domcontentloaded' });
    try {
      await this.cards.first().waitFor({ timeout: 20_000 });
      return true;
    } catch {
      return false; // no results / blocked
    }
  }

  async scrapePage() {
    return this.cards.evaluateAll((nodes) =>
      nodes.map((n) => {
        const t = (sel) => n.querySelector(sel)?.textContent?.trim() || '';
        const link = n.querySelector('a.title');
        return {
          title: link?.textContent?.trim() || '',
          company: t('a.comp-name'),
          experience: t('.expwdth'),
          salary: t('.sal-wrap span') || t('.sal'),
          location: t('.locWdth'),
          posted: t('.job-post-day'),
          url: link?.href || '',
        };
      })
    );
  }

  async search(search, maxPages = 1, jobAgeDays) {
    const all = [];
    for (let p = 1; p <= maxPages; p++) {
      const ok = await this.open(search, p, jobAgeDays);
      if (!ok) break;
      all.push(...(await this.scrapePage()));
      await this.page.waitForTimeout(1500 + Math.random() * 1500); // be polite
    }
    return all;
  }
}
module.exports = { JobSearchPage };
