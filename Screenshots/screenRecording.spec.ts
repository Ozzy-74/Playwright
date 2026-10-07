import {test, chromium, expect} from "@playwright/test"


test("REcord video for single test",async({},testInfo)=>{
    const browser = await chromium.launch()

    const path = "K:\\Testleaf-working\\ScreenRecordings"

    const context = await browser.newContext({recordVideo:{dir:path,size:{width:1280,height:720}}})

    const page = await context.newPage()

    
    await page.goto('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();

    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123'); //password incorrect
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

    await context.close(); //video will only save after closing the context

    const videoPath = await page.video()?.path() 

    await testInfo.attach("Execution video",{path:videoPath,contentType:"video/webm"})
    
})