import { test, expect } from '@playwright/test';

const email = "pratikshajangamwar0316@gmail.com";
let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("PratikshaPP@11052026");

    await page.locator('.btn.btn-block.login-btn').click();

    await page.waitForLoadState('networkidle');

    await context.storageState({ path: 'state.json' });

    webContext = await browser.newContext({ storageState: 'state.json' });

});

test('Web API Test case', async () => {

    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");

    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();


});

test('Web API Test case 2 ', async () => {

    const page = await webContext.newPage();

    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");

    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});