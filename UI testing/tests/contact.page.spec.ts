import { test, expect } from "../fixtures/ui.fixture.js";
import { PAGE_TITLES } from "../config/constants.js";
import { VALID_CONTACT } from "../config/testData.js";

test.describe("Contact Page — Practice Software Testing", () => {
  test.beforeEach(async ({ pages }) => {
    await pages.contact().open();
  });

  test.describe("Отображение формы", () => {
    test("1. Страница Contact открывается с корректным title", async ({
      page,
    }) => {
      await expect(page).toHaveTitle(PAGE_TITLES.contact);
    });

    test("2. Заголовок Contact виден (role heading)", async ({ pages }) => {
      await expect(pages.contact().contactHeading()).toBeVisible();
    });

    test("3. Поле First name видимо (data-test)", async ({ pages }) => {
      await expect(pages.contact().firstName()).toBeVisible();
    });

    test("4. Поле Last name видимо (placeholder)", async ({ pages }) => {
      await expect(pages.contact().lastNameByPlaceholder()).toBeVisible();
    });

    test("5. Поле Email видимо (data-test)", async ({ pages }) => {
      await expect(pages.contact().email()).toBeVisible();
      await expect(pages.contact().email()).toBeEditable();
    });

    test("6. Select Subject содержит опции (data-test)", async ({ pages }) => {
      await expect(pages.contact().subject()).toContainText(
        "Customer service",
      );
      await expect(pages.contact().subject()).toContainText("Webmaster");
    });

    test("7. Textarea Message видима (#id)", async ({ pages }) => {
      await expect(pages.contact().messageById()).toBeVisible();
    });

    test("8. Подсказка по attachment (#attachmentHelp css)", async ({ pages }) => {
      await expect(pages.contact().attachmentHelp()).toContainText(/txt/i);
    });

    test("9. Кнопка Submit доступна (data-test)", async ({ pages }) => {
      await expect(pages.contact().submitButton()).toBeVisible();
    });

    test("10. Навигация Home из Contact (data-test nav)", async ({
      page,
      pages,
    }) => {
      await pages.contact().openHome();
      await expect(page).toHaveURL(/\/$/);
    });
  });

  test.describe("Заполнение и валидация", () => {
    test("11. Заполнение всех полей формы (Page Object)", async ({ pages }) => {
      await pages.contact().fillForm(VALID_CONTACT);
      await expect(pages.contact().firstName()).toHaveValue(
        VALID_CONTACT.firstName,
      );
      await expect(pages.contact().lastName()).toHaveValue(
        VALID_CONTACT.lastName,
      );
      await expect(pages.contact().email()).toHaveValue(VALID_CONTACT.email);
      await expect(pages.contact().message()).toHaveValue(
        VALID_CONTACT.message,
      );
    });

    test("12. Пустой submit — поля обязательны (HTML5 validation)", async ({
      page,
      pages,
    }) => {
      await pages.contact().submit();
      await expect(pages.contact().firstName()).toBeVisible();
      await expect(page).toHaveURL(/\/contact/);
    });

    test("13. Невалидный email не проходит валидацию", async ({
      page,
      pages,
    }) => {
      await pages.contact().email().fill("not-an-email");
      await pages.contact().submit();
      await expect(page).toHaveURL(/\/contact/);
      await expect(pages.contact().email()).toBeVisible();
    });

    test("14. Выбор subject Webmaster (select)", async ({ pages }) => {
      await pages.contact().subject().selectOption("webmaster");
      await expect(pages.contact().subject()).toHaveValue("webmaster");
    });

    test("15. Поле attachment принимает type=file (data-test)", async ({
      pages,
    }) => {
      await expect(pages.contact().attachment()).toHaveAttribute(
        "type",
        "file",
      );
    });
  });
});
