import {test, chromium, expect} from "@playwright/test"

const searchItems:string[] = ['laptop','Gift card','Smartphone']


/*for(let item of searchItems){
        test(`Parameter test - ${item}`,async({page})=>{
        await page.goto("https://demowebshop.tricentis.com/")
        await page.locator("#small-searchterms").fill(item)
        await page.locator("input[value='Search']").click()
        const textOfItem =await page.locator("h2 a").nth(0).allInnerTexts()
        console.log(textOfItem)
        await expect(page.locator("h2 a").nth(0)).toContainText(textOfItem)
    })

}*/

//!using foreach function
test.describe("Searching items",async()=>{

      searchItems.forEach((item)=>{
    test(`Parameter test - ${item}`,async({page})=>{
        await page.goto("https://demowebshop.tricentis.com/")
        await page.locator("#small-searchterms").fill(item)
        await page.locator("input[value='Search']").click()
        const textOfItem =await page.locator("h2 a").nth(0).allInnerTexts()
        console.log("Serached item:",textOfItem)
        await expect(page.locator("h2 a").nth(0)).toContainText(textOfItem)
         })
    
    })

})
  


