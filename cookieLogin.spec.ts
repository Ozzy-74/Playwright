import {test, chromium} from "@playwright/test"

const cookieFile = './data/cookies.data.json'
const url = "https://sdetqa.vercel.app/login_app"

test("Login and save cookies",async({browser})=>{
    
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto(url)

    await page.getByRole("textbox",{name:"Username"}).fill("admin")
    await page.getByRole('textbox',{name:"Password"}).fill("admin123")
    await page.getByLabel("🍪 Cookie").check()
    await page.getByRole("button",{name:" Login"}).click()

    await page.context().storageState({path:cookieFile})
    



})