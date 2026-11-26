import {test, expect} from '@playwright/test';


test('Place Order Assignment Test case', async({page}) => {

    const email = "pratikshajangamwar0316@gmail.com";
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("PratikshaPP@11052026");

    await page.getByRole("button", {name: "Login"}).click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: " Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", {name:"Checkout"}).click();

    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 });

    await page.getByRole("button", {name: "India"}).nth(1).click();

    const cvvInput = await page.locator('div.field.small', { hasText: 'CVV Code' }).locator('input[type="text"]');
    await cvvInput.fill("123");

    const nameOnCard = await page.locator('div.field', { hasText: 'Name on Card ' }).locator('input[type="text"]');
    await nameOnCard.fill("Pratiksha");

    await page.locator("input[name='coupon']").fill("PPPJ11");
    
    await page.locator("button[type='submit']").click();

    await expect (page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    await page.locator("button[routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
 
    for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderID.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();
 
});

