import { expect, test, type Page } from "@playwright/test";
import { KONAMI, visit } from "./helpers";

const PAD: Record<string, string> = {
  ArrowUp: "Up",
  ArrowDown: "Down",
  ArrowLeft: "Back",
  ArrowRight: "Open",
  b: "B: back",
  a: "A: open",
};
const tap = (page: Page, name: string) => page.getByRole("button", { name, exact: true }).tap();

test("D-pad moves, opens and goes back", async ({ page }) => {
  await visit(page);
  await tap(page, "Down");
  await tap(page, "A: open");
  await expect(page).toHaveURL(/#experience$/);
  await tap(page, "B: back");
  await expect(page).toHaveURL(/\/#?$/);
});

test("Konami code works on the D-pad", async ({ page }) => {
  await visit(page);
  for (const key of KONAMI) await tap(page, PAD[key]);
  await expect(page).toHaveURL(/#cheats$/);
});

test("the pad can be hidden and stays hidden", async ({ page }) => {
  await visit(page);
  await page.getByRole("button", { name: /hide/ }).tap();
  await expect(page.getByRole("button", { name: "Up", exact: true })).toBeHidden();
  await page.reload();
  await page.getByRole("button", { name: /show pad/ }).tap();
  await expect(page.getByRole("button", { name: "Up", exact: true })).toBeVisible();
});

test("no sideways scrolling on any main screen", async ({ page }) => {
  for (const hash of ["", "#projects", "#projects/urbanpulse-chennai", "#experience", "#education", "#community", "#terminal", "#stats"]) {
    await visit(page, `/${hash}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, hash || "main").toBeLessThanOrEqual(0);
  }
});
