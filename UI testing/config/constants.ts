export const BASE_URL =
  process.env.BASE_URL ?? "https://practicesoftwaretesting.com";

export const ROUTES = {
  home: "/",
  contact: "/contact",
  login: "/auth/login",
} as const;

export const PAGE_TITLES = {
  home: /Practice Software Testing/i,
  contact: /Contact/i,
  login: /Practice Software Testing/i,
} as const;
