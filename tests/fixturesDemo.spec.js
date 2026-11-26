import { test, expect, request } from '@playwright/test';
import { customtest } from '../utils/fixture';

customtest("Fixtures Demo Test Case", async ({ authenticatedPage, createOrder, testDataForOrder }) => {

    await authenticatedPage.goto("https://rahulshettyacademy.com/client");

    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();

    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();

    console.log(testDataForOrder.productName);

}
);