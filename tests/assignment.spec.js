import {test, expect} from '@playwright/test';


test('Register and Login Account Assignment Test case', async({page}) => {

    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    await page.locator(".text-reset").click();
    
    await page.locator("#firstName").fill("Pratiksha");
    await page.locator("#lastName").fill("Jangamwar");
    await page.locator("#userEmail").fill("pratikshajangamwar0316@gmail.com");
    await page.locator("#userMobile").fill("9876543210");

    await page.locator('.custom-select.ng-untouched.ng-pristine.ng-valid').selectOption('Engineer');
    await page.locator('[value="Female"]').check();

    await page.locator("#userPassword").fill("PratikshaPP@11052026");
    await page.locator("#confirmPassword").fill("PratikshaPP@11052026");
    await page.locator('input[formcontrolname="required"]').check();

    await page.locator('.btn.btn-block.login-btn').click();

    await page.goto("https://rahulshettyacademy.com/client/auth/login");

    await page.locator("#userEmail").fill("pratikshajangamwar0316@gmail.com");
    await page.locator("#userPassword").fill("PratikshaPP@11052026");

    await page.locator('.btn.btn-block.login-btn').click();

    const productTitle = await page.locator('.card h5 b').first().innerText();
    console.log(productTitle);


});

test('Login Assignment Test case', async({page}) => {

    await page.goto("https://rahulshettyacademy.com/client/auth/login");

    await page.locator("#userEmail").fill("pratikshajangamwar0316@gmail.com");
    await page.locator("#userPassword").fill("PratikshaPP@11052026");

     await page.locator('.btn.btn-block.login-btn').click();

     const productTitle = await page.locator('.card h5 b').first().innerText();
     console.log(productTitle);


});  