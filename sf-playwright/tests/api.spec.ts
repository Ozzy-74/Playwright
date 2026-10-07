import { test, expect } from "../fixtures/salesForceFixtures";

test.describe("Salesforce API", () => {
  test("create, fetch and delete a lead", async ({ SFapi }) => {
    const company = `CACTUS JACK ${Date.now()}`;

    const leadId = await SFapi.createLead({
      Salutation: "Mr.",
      FirstName: "Travis",
      LastName: "Scott",
      Company: company,
    });

    const lead = await SFapi.getLead(leadId);
    expect(lead.Company).toBe(company);
    expect(lead.LastName).toBe("Scott");

    await SFapi.deleteLead(leadId);
  });
});
