import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Idea Board/);
});

test("Create New Idea button", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Click the New Idea button
    await page.getByRole("button", { name: "New Idea" }).click();

    // Expects page to have a heading with the name of Installation.
    //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
