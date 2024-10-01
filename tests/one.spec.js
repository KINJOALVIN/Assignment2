// @ts-check
const { test, expect } = require('@playwright/test');

test('Assignement 2', async ({ page }) => {
  //login
  await page.goto('https://www.saucedemo.com/', { waitUntil: 'load' });
  await page.pause()
  await page.locator('input[placeholder="Username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.pause()

  //Sorting z-a
  await page.locator('[data-test="product-sort-container"]').selectOption({value:'za'});
  const productNames = await page.locator('.inventory_item_name').allTextContents();
  const sortedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
  expect(productNames).toEqual(sortedProductNames);

  //sorting high-low
  await page.locator('[data-test="product-sort-container"]').selectOption({value:'hilo'});
  const priceElements = await page.locator('.inventory_item_price').allTextContents();
  const prices = priceElements.map(price => parseFloat(price.replace('$', '')));
  const sortedPrices = [...prices].sort((a, b) => b - a);
  expect(prices).toEqual(sortedPrices);
  await page.pause()

  //Adding items and cheking out journey
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('Standard');
  await page.locator('[data-test="lastName"]').fill('user');
  await page.locator('[data-test="postalCode"]').fill('708')
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await page.locator('[data-test="back-to-products"]').click();

  await page.pause()
});

