import {test, chromium, expect} from "@playwright/test"

test.use({storageState:"./data/cookies.data.json"})

test("Skip login using cookes from data folder",async({page})=>{

    
    await page.goto("https://sdetqa.vercel.app/login_app")
    const logoutBtn = await page.getByRole("button",{name:" Logout & clear storage"}).innerText()
    console.log(logoutBtn)
    expect(logoutBtn).toContain("Logout & clear storage")
})









