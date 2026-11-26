import {test, expect} from '@playwright/test'

//test.describe.configure({mode: 'parallel'})
test.describe.configure({mode: 'serial'})

test("hide and show Test Case", async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();

    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

});

test("PopUp Test Case", async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.pause();

    page.on('dialog', dialog=> dialog.accept());
    await page.locator("#confirmbtn").click();
    
});

test("Mouse Hover Test Case", async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    await page.locator("#mousehover").hover();

});