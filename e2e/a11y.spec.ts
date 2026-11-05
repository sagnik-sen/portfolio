import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { visit } from "./helpers";

// WCAG 2.1 A/AA checks with axe on every kind of page. Menu screens are hash routes on one page.
const PAGES = [
  "/",
  "/#projects",
  "/#projects/atlas",
  "/#skills",
  "/#terminal",
  "/#settings",
  "/#contact",
  "/plain",
  "/projects/urbanpulse-chennai",
  "/projects/atlas",
  "/projects/openescrow",
];

for (const path of PAGES) {
  test(`no accessibility violations on ${path}`, async ({ page }) => {
    await (path.startsWith("/#") || path === "/" ? visit(page, path) : page.goto(path));
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);
  });
}

test("no accessibility violations on the 404 page", async ({ page }) => {
  await page.goto("/no-such-page");
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});

test("case study is linked from the menu and the plain page, and unknown slugs 404", async ({ page }) => {
  await visit(page, "/#projects/atlas");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/atlas$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Atlas");
  await expect(page.locator("figure svg")).toBeVisible();
  await page.goto("/plain");
  await expect(page.getByRole("link", { name: "Read the case study" })).toHaveCount(3);
  expect((await page.request.get("/projects/traise")).status()).toBe(404);
});

test("the boot screen skip link opens the plain page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /one-page|plain/i }).first().click();
  await expect(page).toHaveURL(/\/plain$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sagnik Sen");
});
