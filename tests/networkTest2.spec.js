import { test, expect, request } from '@playwright/test';

const email = "pratikshajangamwar0316@gmail.com";

test('Security Test Request Intercept Test case', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");

    //login and reach orders page
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("PratikshaPP@11052026");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue(
            {
                url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6'
            }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

});