import { test , expect } from '@playwright/test';

test('DropDown and Radio Button Test case', async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const userName =  page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const dropDown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");

    await userName.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    await dropDown.selectOption("Teacher");
    console.log(await page.locator(".radiotextsty").nth(1).isChecked());
    await expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText")

    await page.pause(); 

    //await signIn.click();

});