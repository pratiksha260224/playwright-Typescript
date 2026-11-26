import {test, expect} from '@playwright/test';


test('Place Order Assignment Test case', async({page}) => {

    const email = "pratikshajangamwar0316@gmail.com";
    const products = page.locator(".card-body");
    const productName = 'ZARA COAT 3';

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("PratikshaPP@11052026");

    await page.locator('.btn.btn-block.login-btn').click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    const count = await products.count();

    for(let i=0; i<count; i++)
        {
            if( await products.nth(i).locator("b").textContent() === productName)
            {
                //add to cart
                await products.nth(i).locator("text = Add To Cart").click();
                break;
            }

        }
    
    await page.locator("[routerlink*=cart]").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();   
    await expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*= 'Select Country']").pressSequentially("ind", { delay: 150 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();

    for(let i =0; i<optionCount; i++)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }

    }

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