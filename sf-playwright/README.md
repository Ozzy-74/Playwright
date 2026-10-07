# Salesforce Playwright Framework

## Setup
1. `npm install`
2. `npx playwright install chromium`
3. Copy `.env.example` to `.env` and fill in your values
4. Run: `npm test` (or `npm run test:api`, `test:ui`, `test:e2e`)

## Structure
- `pages/`     Page objects: login -> home -> lead
- `utils/`     `apiUtility.ts` (Salesforce REST calls), `env.ts` (reads .env)
- `fixtures/`  `SFlogin` and `SFapi` fixtures
- `tests/`     api.spec.ts, ui.spec.ts, e2e.spec.ts
