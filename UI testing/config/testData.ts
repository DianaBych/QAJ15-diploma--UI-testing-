import type { ContactFormData } from "../types/ui.types.js";

export const SEARCH_QUERY = "Pliers";

export const VALID_CONTACT: ContactFormData = {
  firstName: "Diana",
  lastName: "Tester",
  email: "Diana.tester@example.com",
  subject: "customer-service",
  message: "Hello, this is an automated UI test message.",
};

export const LOGIN_CREDENTIALS = {
  email: "customer@practicesoftwaretesting.com",
  password: "welcome01",
} as const;
