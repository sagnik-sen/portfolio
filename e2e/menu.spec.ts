import { expect, test } from "@playwright/test";
import { cursor, KONAMI, screen, visit } from "./helpers";

test("boot screen shows once per session and any key skips it", async ({ page }) => {
  await page.goto("/");
  const boot = page.locator(".boot");
  await expect(boot).toBeVisible();
  await expect(boot.getByText("SAGNIK-OS")).toBeVisible();
  await page.keyboard.press("Space");
  await expect(boot).toBeHidden();
  await page.reload();
  await expect(boot).toBeHidden();
});

test("arrows and WASD move, open, go back and quit to the menu", async ({ page }) => {
  await visit(page);
  await expect(cursor(page)).toContainText("Projects");
  await page.keyboard.press("s");
  await expect(cursor(page)).toContainText("Skills");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("d");
  await expect(page).toHaveURL(/#projects$/);
  await expect(cursor(page)).toContainText("Insurance email classifier");
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/#projects\/insurance-email-classifier$/);
  await expect(cursor(page)).toContainText("Copy link");
  await page.keyboard.press("Escape");
  await expect(page).toHaveURL(/#projects$/);
  await expect(cursor(page)).toContainText("Insurance email classifier");
  await page.keyboard.press("ArrowRight");
  await expect(page).toHaveURL(/#projects\/insurance-email-classifier$/);
  await page.keyboard.press("q");
  await expect(screen(page).getByRole("heading")).toHaveText("Main Menu");
  await expect(cursor(page)).toContainText("Projects");
});

test("Konami code opens the cheats screen without triggering menu actions", async ({ page }) => {
  let popups = 0;
  page.on("popup", () => popups++);
  await visit(page, "/#contact");
  for (const key of KONAMI) await page.keyboard.press(key);
  await expect(page).toHaveURL(/#cheats$/);
  await expect(screen(page)).toContainText("CHEATS ENABLED");
  expect(popups).toBe(0);
});

test("Next keeps the cursor on Next so Enter pages through projects", async ({ page }) => {
  await visit(page, "/#projects/atlas");
  await expect(cursor(page)).toContainText("Open on GitHub");
  await page.keyboard.press("s"); // Copy link
  await page.keyboard.press("s"); // Next
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#projects\/traise$/);
  await expect(cursor(page)).toContainText("Next: Ephemera");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#projects\/ephemera$/);
});

test("terminal runs commands and letter keys type instead of navigating", async ({ page }) => {
  await visit(page);
  await page.keyboard.press("`");
  await expect(page).toHaveURL(/#terminal$/);
  const input = page.locator("#terminal-input");
  await expect(input).toBeFocused();
  await input.pressSequentially("wasdq");
  await expect(page).toHaveURL(/#terminal$/);
  await input.fill("cat atlas");
  await input.press("Enter");
  await expect(screen(page)).toContainText("ATLAS");
  await input.fill("open contact");
  await input.press("Enter");
  await expect(page).toHaveURL(/#contact$/);
});

test("theme choice persists across reloads", async ({ page }) => {
  await visit(page, "/#settings");
  await screen(page).getByRole("button", { name: /Amber monochrome/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "amber");
  await expect(page.getByRole("status")).toContainText("Interior designer");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "amber");
});

test("letter keys can be switched off; arrows keep working", async ({ page }) => {
  await visit(page, "/#settings");
  await screen(page).getByRole("button", { name: /Letter keys/ }).click();
  await page.goto("/");
  await expect(cursor(page)).toContainText("Projects");
  await page.keyboard.press("s");
  await expect(cursor(page)).toContainText("Projects");
  await page.keyboard.press("ArrowDown");
  await expect(cursor(page)).toContainText("Skills");
});

test("opening contact unlocks a trophy", async ({ page }) => {
  await visit(page, "/#contact");
  await expect(page.getByRole("status")).toContainText("Recruiter mode");
  await page.goto("/#trophies");
  await expect(screen(page)).toContainText(/1\/\d+ unlocked/);
});

test("external links show the cartridge overlay, then open a new tab", async ({ page, context }) => {
  // Stub GitHub so the test doesn't depend on the network.
  await context.route("https://github.com/**", (route) => route.fulfill({ body: "stub" }));
  await visit(page, "/#contact");
  const popup = page.waitForEvent("popup");
  await screen(page).getByRole("link", { name: /GitHub/ }).click();
  await expect(page.getByText(/LOADING CARTRIDGE/)).toBeVisible();
  await (await popup).waitForURL(/github\.com\/sagnik-sen/);
});

test("skills list tools by use and link to the projects", async ({ page }) => {
  await visit(page, "/#skills");
  await expect(screen(page)).toContainText("React ×3");
  await screen(page).getByRole("link", { name: "Ephemera" }).first().click();
  await expect(page).toHaveURL(/#projects\/ephemera$/);
});

test("? opens the controls screen and neofetch prints system info", async ({ page }) => {
  await visit(page);
  await page.keyboard.press("?");
  await expect(page).toHaveURL(/#controls$/);
  await page.keyboard.press("`");
  const input = page.locator("#terminal-input");
  await expect(input).toBeFocused();
  await input.fill("neofetch");
  await input.press("Enter");
  await expect(screen(page)).toContainText("sagnik@sagnik-os");
  await expect(screen(page)).toContainText("CGPA 9.14");
});

test.describe("clipboard", () => {
  test.use({ permissions: ["clipboard-read", "clipboard-write"] });

  test("copy email puts the address on the clipboard", async ({ page }) => {
    await visit(page, "/#contact");
    await screen(page).getByRole("button", { name: "Copy email address" }).click();
    await expect(page.getByRole("status")).toContainText("EMAIL COPIED");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("sen.sagnik9@gmail.com");
  });
});

test("screensaver appears after a minute idle and the waking key is swallowed", async ({ page }) => {
  await visit(page);
  await page.clock.install();
  await page.mouse.move(10, 10); // re-arms the idle timer under the fake clock
  await page.clock.fastForward("01:05");
  const saver = page.locator(".screensaver");
  await expect(saver).toBeVisible();
  await page.keyboard.press("ArrowDown");
  await expect(saver).toBeHidden();
  await expect(cursor(page)).toContainText("Projects"); // the waking key didn't move the cursor
});

test("unknown pages show the continue screen", async ({ page }) => {
  await page.goto("/nope");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("CONTINUE?");
  await expect(page.getByRole("link", { name: /return to the menu/ })).toHaveAttribute("href", "/");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every content screen is readable as one page", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/A flood-response prototype for Chennai/)).toBeVisible();
    await expect(page.getByText(/CGPA 9.14/).first()).toBeVisible();
    await expect(page.locator("#terminal-input")).toBeHidden();
  });
});
