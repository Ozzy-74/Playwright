import { test, expect } from "@playwright/test";

test("Verify product sorting and product details", async ({ page }) => {

    // 1. Navigate to the webpage
    await page.goto("https://www.bstackdemo.com/");

    // Verify page loaded
    await expect(page).toHaveTitle(/StackDemo/i);

    // 2. Locate Order by dropdown
    const orderBy = page.locator("select");

    // Verify dropdown is visible and enabled
    await expect(orderBy).toBeVisible();
    await expect(orderBy).toBeEnabled();

    // Select "Lowest to highest"
    await orderBy.selectOption({ label: "Lowest to highest" });

    // 3. Capture product names and prices
    const productNames = page.locator(".shelf-item__title");
    const productPrices = page.locator(".shelf-item__price");

    //Get counts
    const nameCount = await productNames.count()
    const priceCount = await productPrices.count()

    console.log("Count of products:",nameCount )
    console.log("Count of prices:", priceCount)

    //Verify count is equal
    expect(nameCount).toEqual(priceCount)

    //print each product name and price

    for(let i=0; i<nameCount;i++){
        const name = await productNames.nth(i).innerText()
        const price = await productPrices.nth(i).innerText()

        console.log(`Product:${name}, price:${price}`)
    }

    //lowest priced product

    const lowestPricedProduct = await productNames.first().innerText()
    const lowestProductPrice = await productPrices.first().innerText()

    console.log(`Lowest priced product:${lowestPricedProduct}, Lowest price of product: ${lowestProductPrice}`)

    //highest priced product
    const highestPricedProduct = await productNames.last().innerText()
    const highestProductPrice = await productPrices.last().innerText()

    console.log(`highest priced product:${lowestPricedProduct}, highest price of product: ${lowestProductPrice}`)
     
  
})