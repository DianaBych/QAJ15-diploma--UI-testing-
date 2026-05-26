import { devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default {
  testDir: "./tests",
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: true,
      },
    ],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? "https://practicesoftwaretesting.com",
    testIdAttribute: "data-test",
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
};
