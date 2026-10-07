import { chromium } from "@playwright/test";

async function saveStorage(){
    let browser = await chromium.launch()
    let context = await browser.newContext()
    let page = await context.newPage()
    await page.goto("https://sdetqa.vercel.app/login_app")

    await page.getByRole("textbox",{name:"Username"}).fill("admin")
    await page.getByRole('textbox',{name:"Password"}).fill("admin123")
    await page.getByLabel("🍪 Cookie").check()
    await page.getByRole("button",{name:" Login"}).click()

    await page.context().storageState({path:'./data/storageCookies.json'})
    
}

saveStorage()