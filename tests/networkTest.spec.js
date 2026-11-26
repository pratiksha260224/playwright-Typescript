import { test, expect, request } from '@playwright/test';
const { APiUtils } = require('../utils/APiUtils');


const loginPayload = { userEmail: "pratikshajangamwar0316@gmail.com", userPassword: "PratikshaPP@11052026" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };

const fakePayloadOrders = { data: [], message: "No Orders" };

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});


test('Network Test case', async ({ page }) => {

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);

    }, response.token);


    await page.goto("https://rahulshettyacademy.com/client");

    const email = "pratikshajangamwar0316@gmail.com";
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //intercepting response - API Response->browser->render data on front end
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill(
                {
                    response,
                    body,
                }
            )
        }
    )

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());

});