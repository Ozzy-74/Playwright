import { Page, expect } from "@playwright/test";

export class LeadPage {
  constructor(private page: Page) {}

  private get searchBox() {
    return this.page.getByPlaceholder("Search this list...");
  }

  async expectLoaded() {
    await expect(this.searchBox).toBeVisible();
  }

  async searchLead(companyName: string) {
    await this.searchBox.fill(companyName);
    await this.searchBox.press("Enter");
  }

  /** Newly created records can take a few seconds to appear in list search, hence the longer timeout. */
  async expectLeadInList(companyName: string) {
    const cell = this.page.locator("table").getByText(companyName, { exact: true }).first();
    await expect(cell).toBeVisible({ timeout: 30_000 });
  }
}
