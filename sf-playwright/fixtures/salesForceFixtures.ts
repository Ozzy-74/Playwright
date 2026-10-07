import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/login";
import { SalesForceAPI } from "../utils/apiUtility";
import { getEnv } from "../utils/env";

type SalesforceFixtures = {
  SFlogin: LoginPage;
  SFapi: SalesForceAPI;
};

export const test = baseTest.extend<SalesforceFixtures>({
  // Opens the Salesforce login page and hands the test a ready LoginPage
  SFlogin: async ({ page }, use) => {
    await page.goto(getEnv("SF_BASE_URL"));
    await use(new LoginPage(page));
  },

  // Gets an OAuth token before the test, and deletes any leads the test created afterwards
  SFapi: async ({ request }, use) => {
    const api = new SalesForceAPI(request);
    await api.generateToken();
    await use(api);
    await api.cleanup();
  },
});

export { expect } from "@playwright/test";
