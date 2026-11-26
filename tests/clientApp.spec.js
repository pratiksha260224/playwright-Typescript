import {test, expect} from '@playwright/test';


test('Client App Assignment Test case', async({page}) => {

    const email = "pratikshajangamwar0316@gmail.com";
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("PratikshaPP@11052026");

    await page.locator('.btn.btn-block.login-btn').click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 

});