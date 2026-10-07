import { Page } from "@playwright/test";
import { HomePage } from "./home";

export class LoginPage {
  constructor(private page: Page) {}

  async enterUsername(username: string) {
    await this.page.locator("#username").fill(username);
  }

  async verifyUsername() {
    await this.page.locator("#Login").click();
  }

  async enterPassword(password: string) {
    await this.page.locator("#password").fill(password);
  }

  async clickLogin(): Promise<HomePage> {
    await this.page.locator("#Login").click();
    await this.page.locator(`//div[@class="slds-icon-waffle"]`).waitFor({ timeout: 60_000 });
    return new HomePage(this.page);
  }

  /** Convenience wrapper that runs the full login sequence in one call. */
  async login(username: string, password: string): Promise<HomePage> {
    await this.enterUsername(username);
    await this.verifyUsername();
    await this.enterPassword(password);
    return this.clickLogin();
  }
}
