const fs = require('fs');
const path = require('path');

const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

function dedupe(jobs) {
  const seen = new Set();
  return jobs.filter((j) => j.url && !seen.has(j.url) && seen.add(j.url));
}

function saveJobs(jobs, name = 'jobs') {
  const dir = path.join(process.cwd(), 'output');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${name}.json`), JSON.stringify(jobs, null, 2));
  if (jobs.length) {
    const cols = Object.keys(jobs[0]);
    const csv = [cols.join(','), ...jobs.map((j) => cols.map((c) => esc(j[c])).join(','))].join('\n');
    fs.writeFileSync(path.join(dir, `${name}.csv`), csv);
  }
}
module.exports = { saveJobs, dedupe };
