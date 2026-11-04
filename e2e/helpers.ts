import type { Page } from "@playwright/test";

// Opens a page with the boot screen already "seen" this session.
export async function visit(page: Page, path = "/") {
  await page.addInitScript(() => sessionStorage.setItem("booted", "1"));
  await page.goto(path);
}

export const screen = (page: Page) => page.locator("section:not([hidden])");
export const cursor = (page: Page) => page.locator(":focus");

export const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
