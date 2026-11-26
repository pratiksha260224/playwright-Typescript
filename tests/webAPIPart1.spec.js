import {test, expect, request} from '@playwright/test';
const {APiUtils} = require ('../utils/APiUtils');


const loginPayload = {userEmail: "pratikshajangamwar0316@gmail.com", userPassword: "PratikshaPP@11052026"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
// let token;
// let orderId;
let response;

 
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});

// test.beforeEach(()=>
// {


// });

test('Place Order Assignment Test case', async({page}) => {

    //const APiUtils = new APiUtils(apiContext, loginPayload);
    //const orderId = createOrder(orderPayload);

    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
        
    }, response.token );

    
      await page.goto("https://rahulshettyacademy.com/client");
    // await page.getByPlaceholder("email@example.com").fill(email);
    // await page.getByPlaceholder("enter your passsword").fill("PratikshaPP@11052026");

    // await page.getByRole("button", {name: "Login"}).click();

    // await page.waitForLoadState('networkidle');

    const email = "pratikshajangamwar0316@gmail.com";
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';

    //await page.locator(".card-body b").first().waitFor();
    //await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: " Add To Cart"}).click();
    //await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
 
    for (let i = 0; i < await rows.count(); ++i)
         {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (response.orderId.includes(rowOrderId))
                 {
                    await rows.nth(i).locator("button").first().click();
                    break;
                 }
         }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
 
});

   