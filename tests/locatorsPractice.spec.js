import { test, expect} from '@playwright/test';

test("Locators Practice", async({page})=> {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //getByLabel works on clickable items
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    //await page.getByLabel("Employed").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    //getByPlaceholder : if placeholder attribute is present 
    await page.getByPlaceholder("Password").fill("Prisha");

    //getByRole
    await page.getByRole("button",{name: "submit"}).click();
    await page.getByRole("link", {name: "shop"}).click();

    //getByText
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //assertions
    //await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10000});

    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add" }).click();

});


test("Test level Timeout", async({page})=> {

    test.setTimeout(60000);
    const slowExpect = expect.configure({ timeout: 10000 });
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    //getByLabel works on clickable items
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    //await page.getByLabel("Employed").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");

    //getByPlaceholder : if placeholder attribute is present 
    await page.getByPlaceholder("Password").fill("Prisha");

    //getByRole
    await page.getByRole("button",{name: "submit"}).click();
    await page.getByRole("link", {name: "shop"}).click();

    //getByText
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //assertions
    //await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:7000});

    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add" }).click();


    
});