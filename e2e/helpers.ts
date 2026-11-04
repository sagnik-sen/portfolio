import type { Page } from "@playwright/test";

// Opens a page with the boot screen already "seen" this session, and waits
// until the menu has hydrated (it puts the cursor on an entry) so input works.
export async function visit(page: Page, path = "/") {
  await page.addInitScript(() => sessionStorage.setItem("booted", "1"));
  await page.goto(path);
  await page.waitForFunction(() => document.activeElement?.matches("[data-item], #terminal-input"));
}

export const screen = (page: Page) => page.locator("section:not([hidden])");
export const cursor = (page: Page) => page.locator(":focus");

export const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
