import {test, expect} from '@playwright/test';

test('Screenshot Test case', async({page}) => {

   await page.goto("https://www.google.com/");

   await page.locator(".gLFyf").fill("India");
   await page.screenshot({path: 'screenshot.png'});
   await page.locator(".gLFyf").screenshot({path: 'locatorScreenshot.png'});

});


test('Screenshot and Visual Testing Comparison Test case', async({page}) => {

   await page.goto("https://flightaware.com/");

   expect(await page.screenshot()).toMatchSnapshot("ss.png");
   
});

test('Screenshot and Visual Comparison Test case', async({page}) => {

   await page.goto("https://www.google.com/");

   expect(await page.screenshot()).toMatchSnapshot("ss1.png");
   
});

