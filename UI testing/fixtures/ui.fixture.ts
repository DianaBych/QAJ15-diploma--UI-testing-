import { test as base } from "@playwright/test";
import { PageFactory } from "../pages/factory/PageFactory.js";

type UiFixtures = {
  pages: PageFactory;
};

export const test = base.extend<UiFixtures>({
  pages: async ({ page }, use) => {
    await use(new PageFactory(page));
  },
});

export { expect } from "@playwright/test";
