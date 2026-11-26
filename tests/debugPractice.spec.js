import { test, expect } from '@playwright/test';

test("Debug Practice", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //getByLabel works on clickable items
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    //await page.getByLabel("Employed").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    //getByPlaceholder : if placeholder attribute is present 
    await page.getByPlaceholder("Password").fill("Prisha");

    //getByRole
    await page.getByRole("button", { name: "submit" }).click();
    await page.getByRole("link", { name: "shop" }).click();

    //getByText
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add" }).click();

});