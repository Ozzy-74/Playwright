import {expect, test} from "@playwright/test"

const url = "https://www.worldometers.info/geography/flags-of-the-world/"

test("Automatic scrolling",async({page})=>{
    await page.goto(url)

    const usaFlag = page.getByAltText("Flag of United States")

    await expect(usaFlag).toBeVisible()
    
})

test("Scroll by pixel values",async({page})=>{
    //navigate to the page
    await page.goto(url)

    await page.evaluate( ()=>{
        window.scrollBy(0,2000) //scroll by pixel values
    })
    
})

test("Scroll to specific element",async({page})=>{
    await page.goto(url)

    const indiaFlag = page.getByAltText("Flag of India")
    await indiaFlag.scrollIntoViewIfNeeded()
})

test("Scroll to bottom of the document",async({page})=>{
    //navigate to the page
    await page.goto(url)

    await page.evaluate( ()=>{
        window.scrollTo(0,document.body.scrollHeight) //scroll by pixel values
    })
    
}) 