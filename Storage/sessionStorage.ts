import { chromium } from "@playwright/test";
import fs from "fs"

async function sessionStorage(){
    let browser = await chromium.launch()
    let context = await browser.newContext()
    let page = await context.newPage()
    await page.goto("https://sdetqa.vercel.app/login_app")

    await page.getByRole("textbox",{name:"Username"}).fill("admin")
    await page.getByRole('textbox',{name:"Password"}).fill("admin123")
    await page.getByLabel("⏳ Session").check()
    await page.getByRole("button",{name:" Login"}).click()

   //capture session storage
   const session = await page.evaluate(()=>{
    return JSON.stringify(window.sessionStorage)

   })
    
   fs.writeFileSync("./data/sessionData.json", session)
}

sessionStorage()