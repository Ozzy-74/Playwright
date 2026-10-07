import { test } from "../fixtures/salesForceFixtures";
import { getEnv } from "../utils/env";

test("Login and open the Leads page", async ({ SFlogin }) => {
  const home = await SFlogin.login(getEnv("SF_USERNAME"), getEnv("SF_PASSWORD"));
  const leads = await home.navigateToLeadPage("Leads");
  await leads.expectLoaded();
});
