// @ts-check
import test, { expect } from "@playwright/test";

test.describe("Login form tests", () => {
  test("displays error when fields are empty", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.click('button:has-text("Login")');

    const errorMessage = await page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText("Email and password are required.");
  });

  test("displays error for invalid email", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.fill('input[type="text"]', "invalid-email");
    await page.fill('input[type="password"]', "password123");
    await page.click('button:has-text("Login")');

    const errorMessage = await page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText("Invalid email address.");
  });

  test("does not display error for valid input", async ({ page }) => {
    await page.goto("http://localhost:5173");

    await page.fill('input[type="text"]', "test@example.com");
    await page.fill('input[type="password"]', "password123");
    await page.click('button:has-text("Login")');

    const errorMessage = await page.locator('[data-testid="error-message"]');
    await expect(errorMessage).toBeHidden();
  });
});
