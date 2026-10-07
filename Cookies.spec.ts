import {test, chromium} from "@playwright/test"

test("Cookies",async()=>{
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    //Add cookies
     
    await context.addCookies([
        {
            name: 'username',
            value: 'Pavan',
            domain: 'playwright.dev',
            path: '/',
            httpOnly: false,
            secure: true,
            sameSite: 'Lax'

        }
    ])

    const cookies = await context.cookies()

        console.log(cookies)
    const clearCookies = await context.clearCookies()
    console.log(clearCookies)
})