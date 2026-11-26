import { test, expect } from '@playwright/test';
// import { LoginPage } from '../pageobjects/LoginPage';
// import { DashboardPage } from '../pageobjects/DashboardPage';
import { POManager } from '../pageobjects/POManager';
import { placeorderTestData } from '../utils/placeorderTestData.json';
//const {dataset } = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
import dataset from '../utils/placeorderTestData.json' with { type: 'json' };

for (const data of dataset) {
    test(`ClientAppPO Test case for ${data.productName}`, async ({ page }) => {

        const poManager = new POManager(page);


        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.userEmail, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");

        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);

        await dashboardPage.navigateToOrders();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });
}





// const cvvInput = await page.locator('div.field.small', { hasText: 'CVV Code' }).locator('input[type="text"]');
// await cvvInput.fill("123");

// const nameOnCard = await page.locator('div.field', { hasText: 'Name on Card ' }).locator('input[type="text"]');
// await nameOnCard.fill("Pratiksha");

// await page.locator("input[name='coupon']").fill("PPPJ11");
// await page.locator("button[type='submit']").click();

// await expect(page.locator(".user__name [type='text']").first()).toHaveText(userEmail);
// await page.locator(".action__submit").click();

// await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
// const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
// console.log(orderID);

// await .click();

// await page.locator("tbody").waitFor();
// const rows = await page.locator("tbody tr");

// for (let i = 0; i < await rows.count(); ++i) {
//     const rowOrderId = await rows.nth(i).locator("th").textContent();
//     if (orderID.includes(rowOrderId)) {
//         await rows.nth(i).locator("button").first().click();
//         break;
//     }
// }

// const orderIdDetails = await page.locator(".col-text").textContent();
// expect(orderID.includes(orderIdDetails)).toBeTruthy();
