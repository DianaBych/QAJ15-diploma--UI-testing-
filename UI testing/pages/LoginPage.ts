import type { Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { ROUTES } from "../config/constants.js";

export class LoginPage extends BasePage {
  readonly path = ROUTES.login;

  constructor(page: Page) {
    super(page);
  }

  // data-test
  readonly email = () => this.page.getByTestId("email");
  readonly password = () => this.page.getByTestId("password");
  readonly submitButton = () => this.page.getByTestId("login-submit");
  readonly registerLink = () => this.page.getByTestId("register-link");
  readonly forgotPasswordLink = () => this.page.getByTestId("forgot-password-link");

  // id
  readonly emailById = () => this.page.locator("#email");
  readonly passwordById = () => this.page.locator("#password");

  // placeholder
  readonly emailByPlaceholder = () => this.page.getByPlaceholder("Your email");

  // text link
  readonly registerByText = () =>
    this.page.getByText("Register your account");

  // css — форма авторизации
  readonly loginForm = () => this.page.locator("form").filter({ has: this.email() });

  // xpath
  readonly submitByXpath = () =>
    this.page.locator('xpath=//input[@data-test="login-submit"]');

  async open(): Promise<void> {
    await this.goto(this.path);
  }

  async login(email: string, password: string): Promise<void> {
    await this.email().fill(email);
    await this.password().fill(password);
    await this.submitButton().click();
  }
}
