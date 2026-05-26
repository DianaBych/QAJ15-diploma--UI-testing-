import type { Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { ROUTES } from "../config/constants.js";
import type { ContactFormData } from "../types/ui.types.js";

export class ContactPage extends BasePage {
  readonly path = ROUTES.contact;

  constructor(page: Page) {
    super(page);
  }

  // data-test
  readonly firstName = () => this.page.getByTestId("first-name");
  readonly lastName = () => this.page.getByTestId("last-name");
  readonly email = () => this.page.getByTestId("email");
  readonly subject = () => this.page.getByTestId("subject");
  readonly message = () => this.page.getByTestId("message");
  readonly attachment = () => this.page.getByTestId("attachment");
  readonly submitButton = () => this.page.getByTestId("contact-submit");

  // id
  readonly firstNameById = () => this.page.locator("#first_name");
  readonly messageById = () => this.page.locator("#message");

  // placeholder
  readonly lastNameByPlaceholder = () =>
    this.page.getByPlaceholder("Your last name *");

  // role + name
  readonly contactHeading = () =>
    this.page.getByRole("heading", { name: "Contact" });

  // css
  readonly attachmentHelp = () => this.page.locator("#attachmentHelp");

  async open(): Promise<void> {
    await this.goto(this.path);
  }

  async fillForm(data: ContactFormData): Promise<void> {
    await this.firstName().fill(data.firstName);
    await this.lastName().fill(data.lastName);
    await this.email().fill(data.email);
    await this.subject().selectOption(data.subject);
    await this.message().fill(data.message);
  }

  async submit(): Promise<void> {
    await this.submitButton().click();
  }
}
