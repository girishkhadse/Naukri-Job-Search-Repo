# Naukri Playwright (JavaScript)

## Setup
```bash
npm install
npm run install:browsers
cp .env.example .env     # fill in credentials
```

## Run
```bash
npm test                 # login + all tests
npm run test:search      # job search only
npm run test:profile     # profile check only
npm run report           # open HTML report
```
Results are saved to `output/*.json` and `output/*.csv`.

## If login fails (OTP / captcha)
Log in manually once and save the session, then leave `.env` credentials empty:
```bash
npm run save-auth
```

## Customise
Edit `config/search.json` (keywords, location, experience, pages, job age).

## Selectors
Naukri changes its markup often. If something breaks, run
`npx playwright codegen https://www.naukri.com` and update the locators in `pages/`.

## Note
Automation may violate Naukri's terms of use. Keep it to personal use, low volume, and add delays.
