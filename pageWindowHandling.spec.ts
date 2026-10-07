import { test, expect, Page } from "@playwright/test";

test("New tab handling", async({browser})=>{
    
    const context = await browser.newContext()
     const page = await context.newPage()

     await page.goto("https://sdetqa.vercel.app/autoplay")

    const [newPage] = await Promise.all([context.waitForEvent('page'),page.getByRole('button',{name:"New Tab",exact:true}).click()])
    
    console.log(await newPage.title())
    await expect(newPage).toHaveTitle(/Playwright/)
     

     await page.waitForTimeout(5000)
})

test("New window handling", async({browser})=>{
    
    const context = await browser.newContext()
     const page = await context.newPage()

     await page.goto("https://sdetqa.vercel.app/autoplay")

    const [newWindow] = await Promise.all([context.waitForEvent('page'),page.getByRole('button',{name:"New Window",exact:true}).click()])
    
    console.log(await newWindow.title())
    await expect(newWindow).toHaveTitle(/Playwright/)
     

     await page.waitForTimeout(5000)
})