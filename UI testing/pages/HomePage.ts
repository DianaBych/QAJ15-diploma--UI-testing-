import type { Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { ROUTES } from "../config/constants.js";

export class HomePage extends BasePage {
  readonly path = ROUTES.home;

  constructor(page: Page) {
    super(page);
  }

  // data-test
  readonly searchInput = () => this.page.getByTestId("search-query");
  readonly searchSubmit = () => this.page.getByTestId("search-submit");
  readonly searchReset = () => this.page.getByTestId("search-reset");
  readonly sortSelect = () => this.page.getByTestId("sort");
  readonly filtersPanel = () =>
    this.page.locator("#filters[data-test='filters']");
  readonly ecoFriendlyFilter = () => this.page.getByTestId("eco-friendly-filter");
  readonly productNames = () => this.page.getByTestId("product-name");

  // placeholder
  readonly searchByPlaceholder = () => this.page.getByPlaceholder("Search");

  async open(): Promise<void> {
    await this.goto(this.path);
    await this.page.waitForLoadState("networkidle");
    await this.productNames().first().waitFor({ state: "visible", timeout: 15_000 });
  }

  async search(query: string): Promise<void> {
    await this.searchInput().fill(query);
    await this.searchSubmit().click();
  }

  async clearSearch(): Promise<void> {
    await this.searchReset().click();
  }

  async sortBy(optionLabel: string): Promise<void> {
    await this.sortSelect().selectOption({ label: optionLabel });
    await this.page.waitForLoadState("networkidle");
  }

  async getVisibleProductCount(): Promise<number> {
    await this.productNames().first().waitFor({ state: "visible", timeout: 15_000 });
    return this.productNames().count();
  }
}
