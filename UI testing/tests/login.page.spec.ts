import { test, expect } from "../fixtures/ui.fixture.js";
import { PAGE_TITLES, ROUTES } from "../config/constants.js";
import { LOGIN_CREDENTIALS } from "../config/testData.js";

test.describe("Login Page — Practice Software Testing", () => {
  test.beforeEach(async ({ pages }) => {
    await pages.login().open();
  });

  test.describe("Форма авторизации", () => {
    test("1. Страница Login открывается с корректным title", async ({ page }) => {
      await expect(page).toHaveTitle(PAGE_TITLES.login);
    });

    test("2. URL содержит /auth/login", async ({ page }) => {
      await expect(page).toHaveURL(/\/auth\/login/);
    });

    test("3. Поле Email видимо (data-test)", async ({ pages }) => {
      await expect(pages.login().email()).toBeVisible();
    });

    test("4. Поле Password видимо (data-test)", async ({ pages }) => {
      await expect(pages.login().password()).toBeVisible();
    });

    test("5. Email по #id доступен для ввода", async ({ pages }) => {
      await expect(pages.login().emailById()).toBeEditable();
    });

    test("6. Password по #id имеет type=password", async ({ pages }) => {
      await expect(pages.login().passwordById()).toHaveAttribute(
        "type",
        "password",
      );
    });

    test("7. Placeholder Your email (placeholder locator)", async ({ pages }) => {
      await expect(pages.login().emailByPlaceholder()).toHaveAttribute(
        "placeholder",
        "Your email",
      );
    });

    test("8. Кнопка Submit видима (xpath locator)", async ({ pages }) => {
      await expect(pages.login().submitByXpath()).toBeVisible();
    });

    test("9. Форма login содержит email и password (css form)", async ({
      pages,
    }) => {
      await expect(pages.login().loginForm()).toBeVisible();
    });

    test("10. Ссылка Register видна (data-test)", async ({ pages }) => {
      await expect(pages.login().registerLink()).toBeVisible();
    });
  });

  test.describe("Ссылки и сценарии входа", () => {
    test("11. Ссылка Forgot password видна (data-test)", async ({ pages }) => {
      await expect(pages.login().forgotPasswordLink()).toBeVisible();
    });

    test("12. Переход на Register (text link)", async ({ page, pages }) => {
      await pages.login().registerByText().click();
      await expect(page).toHaveURL(/\/auth\/register/);
    });

    test("13. Переход на Home через nav (Page Factory)", async ({
      page,
      pages,
    }) => {
      await pages.login().openHome();
      await expect(page).toHaveURL(/\/$/);
    });

    test("14. Пустой submit — остаёмся на login", async ({ page, pages }) => {
      await pages.login().submitButton().click();
      await expect(page).toHaveURL(/\/auth\/login/);
    });

    test("15. Успешный login с валидными credentials", async ({
      page,
      pages,
    }) => {
      test.skip(
        !!process.env.CI,
        "Cloudflare blocks automated login from CI runners",
      );

      await pages.login().login(
        LOGIN_CREDENTIALS.email,
        LOGIN_CREDENTIALS.password,
      );
      await expect(page).not.toHaveURL(ROUTES.login);
      await expect(page.getByTestId("nav-profile")).toBeVisible({
        timeout: 15_000,
      });
    });
  });
});
