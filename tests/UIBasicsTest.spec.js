import { test , expect } from '@playwright/test';
//const {test} = require('@playwright/test');

test.only('Browser Context Test case', async ({browser})=> 
{
    //chrome - pluggins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    // await page.locator("#username").fill("Pratiksha");
    // await page.locator("[type='password']").fill("Pratiksha1105");
    // await page.locator("#signInBtn").click();
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText("Incorrect");    
    
    //await page.locator("#username").fill("");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();

    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    console.log(await page.locator(".card-body a").nth(2).textContent());
    console.log(await page.locator(".card-body a").last().textContent());

    console.log(await page.locator(".card-body a").allTextContents());
    
});

test('Page Context Test Case', async({page})=>
{
   await page.goto("https://google.com");
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");

});