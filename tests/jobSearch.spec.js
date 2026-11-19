const { test, expect } = require('@playwright/test');
const { JobSearchPage } = require('../pages/JobSearchPage');
const { saveJobs, dedupe } = require('../utils/saveJobs');
const cfg = require('../config/search.json');

test.describe('Naukri job search', () => {
  for (const search of cfg.searches) {
    test(`search: ${search.keyword} in ${search.location}`, async ({ page }) => {
      const jobsPage = new JobSearchPage(page);
      const jobs = dedupe(await jobsPage.search(search, cfg.maxPages, cfg.jobAgeDays));

      console.log(`Found ${jobs.length} jobs for "${search.keyword}" in ${search.location}`);
      saveJobs(jobs, `${search.keyword}-${search.location}`.replace(/\s+/g, '_'));

      expect(jobs.length, 'at least one job should be found').toBeGreaterThan(0);
      for (const j of jobs.slice(0, 5)) {
        expect(j.title).not.toBe('');
        expect(j.url).toContain('naukri.com');
      }
    });
  }
});
