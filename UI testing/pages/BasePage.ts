import type { Page } from "@playwright/test";

// Базовый Page Object — общая навигация и хелперы
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // data-test
  readonly navHome = () => this.page.getByTestId("nav-home");
  readonly navContact = () => this.page.getByTestId("nav-contact");
  readonly navSignIn = () => this.page.getByTestId("nav-sign-in");
  readonly notificationBar = () => this.page.getByTestId("notification-bar");

  // id
  readonly navbar = () => this.page.locator("#navbarSupportedContent");

  // text
  readonly footerDemoText = () =>
    this.page.getByText("This is a DEMO application", { exact: false });

  // css
  readonly logoLink = () => this.page.locator("a.navbar-brand");

  async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async openHome(): Promise<void> {
    await this.navHome().click();
  }

  async openContact(): Promise<void> {
    await this.navContact().click();
  }

  async openSignIn(): Promise<void> {
    await this.navSignIn().click();
  }
}
