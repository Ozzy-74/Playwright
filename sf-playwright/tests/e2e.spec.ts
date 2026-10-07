import { test, expect } from "../fixtures/salesForceFixtures";
import { getEnv } from "../utils/env";

test("Create lead via API and verify it in the UI", async ({ SFlogin, SFapi }) => {
  // API: create a lead with a unique company name
  const company = `ye inc ${Date.now()}`;
  const leadId = await SFapi.createLead({
    Salutation: "Mr.",
    FirstName: "Kanye",
    LastName: "West",
    Company: company,
  });

  const lead = await SFapi.getLead(leadId);
  expect(lead.Company).toBe(company);

  // UI: log in, open Leads, search and verify
  const home = await SFlogin.login(getEnv("SF_USERNAME"), getEnv("SF_PASSWORD"));
  const leads = await home.navigateToLeadPage("Leads");
  await leads.searchLead(company);
  await leads.expectLeadInList(company);

  // The SFapi fixture deletes the lead automatically after the test
});
