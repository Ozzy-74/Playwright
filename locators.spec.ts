import {expect, test} from "@playwright/test"


test.beforeEach(async({page})=>{
     await page.goto("https://sdetqa.vercel.app/filters_practice")

})
test("Test using and filters", async({page}) =>{

    const productBtn = page.getByRole('listitem').filter({hasText:"Product 2"}).getByRole('button',{name:"Add to cart"})
    await expect(productBtn).toBeVisible()  
})



test.afterAll(async({page})=>{
    page.close()
})
https://sdetqa.vercel.app/autoplay.html