const base = require('@playwright/test');
const { request } = require('@playwright/test');
const { APiUtils } = require('./APiUtils');


const loginPayload = { userEmail: "pratikshajangamwar0316@gmail.com", userPassword: "PratikshaPP@11052026" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }] };

exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();

            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator("#userEmail").fill("pratikshajangamwar0316@gmail.com");
            await page.locator("#userPassword").fill("PratikshaPP@11052026");

            await page.locator('.btn.btn-block.login-btn').click();

            await page.waitForLoadState('networkidle');
            await use(page);
            //tear down
            await context.close();

        },

        createOrder: async ({ }, use) => {
            const apiContext = await request.newContext();
            const apiUtils = new APiUtils(apiContext, loginPayload);
            const response = await apiUtils.createOrder(orderPayload);
            await use(response);
            //tear down
            await apiContext.dispose();

        },


        testDataForOrder: async ({ }, use) => {
            await use({
                productName: 'ADIDAS ORIGINAL'

            });
        }
        

    }

);
