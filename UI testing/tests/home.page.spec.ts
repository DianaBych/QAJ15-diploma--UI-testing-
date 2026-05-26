import { test, expect } from "../fixtures/ui.fixture.js";
import { PAGE_TITLES } from "../config/constants.js";
import { SEARCH_QUERY } from "../config/testData.js";

test.describe("Home Page — Practice Software Testing", () => {
  test.beforeEach(async ({ pages }) => {
    await pages.home().open();
  });

  test.describe("Загрузка и навигация", () => {
    test("1. Главная страница открывается с корректным title", async ({
      page,
    }) => {
      await expect(page).toHaveTitle(PAGE_TITLES.home);
    });

    test("2. Навигационная панель видима (локатор #id)", async ({ pages }) => {
      await expect(pages.home().navbar()).toBeVisible();
    });

    test("3. Ссылка Home активна (data-test)", async ({ pages }) => {
      await expect(pages.home().navHome()).toBeVisible();
    });

    test("4. Переход на Contact через nav (data-test)", async ({
      page,
      pages,
    }) => {
      await pages.home().openContact();
      await expect(page).toHaveURL(/\/contact/);
    });

    test("5. Переход на Sign in через nav (data-test)", async ({
      page,
      pages,
    }) => {
      await pages.home().openSignIn();
      await expect(page).toHaveURL(/\/auth\/login/);
    });

    test("6. Notification bar отображается (data-test)", async ({ pages }) => {
      await expect(pages.home().notificationBar()).toBeVisible();
    });

    test("7. Footer содержит текст DEMO (text locator)", async ({ pages }) => {
      await expect(pages.home().footerDemoText()).toBeVisible();
    });

    test("8. Логотип кликабелен (css locator)", async ({ pages }) => {
      await expect(pages.home().logoLink()).toBeVisible();
    });
  });

  test.describe("Каталог и фильтры", () => {
    test("9. Отображаются карточки товаров (data-test prefix)", async ({
      pages,
    }) => {
      const count = await pages.home().getVisibleProductCount();
      expect(count).toBeGreaterThan(0);
    });

    test("10. Поле поиска доступно (placeholder locator)", async ({ pages }) => {
      await expect(pages.home().searchByPlaceholder()).toBeVisible();
      await expect(pages.home().searchByPlaceholder()).toBeEditable();
    });

    test("11. Поиск существующего товара — Pliers (data-test)", async ({
      pages,
    }) => {
      await pages.home().search(SEARCH_QUERY);
      await expect(pages.home().productNames().first()).toContainText(
        /pliers/i,
      );
    });

    test("12. Сброс поиска очищает query (data-test reset)", async ({
      pages,
    }) => {
      await pages.home().search(SEARCH_QUERY);
      await pages.home().clearSearch();
      await expect(pages.home().searchInput()).toHaveValue("");
    });

    test("13. Сортировка Name (Z - A) (select data-test)", async ({ pages }) => {
      await pages.home().sortBy("Name (Z - A)");
      await expect(
        pages.home().sortSelect().locator("option:checked"),
      ).toHaveText("Name (Z - A)");
    });

    test("14. Фильтр eco-friendly переключается (checkbox data-test)", async ({
      pages,
    }) => {
      await pages.home().ecoFriendlyFilter().check();
      await expect(pages.home().ecoFriendlyFilter()).toBeChecked();
    });

    test("15. Панель фильтров содержит sort (xpath + data-test)", async ({
      pages,
    }) => {
      await expect(pages.home().filtersPanel()).toBeVisible();
      await expect(pages.home().sortSelect()).toBeVisible();
    });
  });
});
