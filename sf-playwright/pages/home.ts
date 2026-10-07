import { Page } from "@playwright/test";
import { LeadPage } from "./lead";

export class HomePage {
  constructor(private page: Page) {}

  async navigateToLeadPage(appName: string): Promise<LeadPage> {
    await this.page.getByRole("button", { name: "App Launcher", exact: true }).click();

    const searchBox = this.page.getByPlaceholder("Search apps and items...");
    await searchBox.waitFor({ state: "visible" });
    await searchBox.fill(appName);

    const result = this.page.getByText(appName, { exact: true });
    await result.waitFor({ state: "visible" });
    await result.click();

    return new LeadPage(this.page);
  }
}
