import type { Page } from "@playwright/test";
import { HomePage } from "../HomePage.js";
import { ContactPage } from "../ContactPage.js";
import { LoginPage } from "../LoginPage.js";

//Page Factory — создаёт Page Object по имени страницы 
export class PageFactory {
  constructor(private readonly page: Page) {}

  home(): HomePage {
    return new HomePage(this.page);
  }

  contact(): ContactPage {
    return new ContactPage(this.page);
  }

  login(): LoginPage {
    return new LoginPage(this.page);
  }
}
