import {expect, test} from "@playwright/test"

test.beforeEach("Navigate to file upload page",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")
    await expect(page).toHaveURL(/autoplay/)
})

test("File upload",async({page})=>{
    const singleInput = page.locator("#singleFileInput")
    const uploadBtn = page.getByRole('button',{name:"Upload Single File",exact:true})
    const uploadStatus = page.locator('#singleFileStatus')

    //upload single file
    await singleInput.setInputFiles("K:\\Testleaf-working\\data\\wallpaperflare.com_wallpaper.jpg")
    await uploadBtn.click()
    await expect(uploadStatus).toHaveText("Single file selected: wallpaperflare.com_wallpaper.jpg, Size: 168497 bytes, Type: image/jpeg")


})