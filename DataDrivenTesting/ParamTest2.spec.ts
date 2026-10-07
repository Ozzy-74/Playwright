import {test, chromium, expect} from "@playwright/test"

const userData:string[][]=[
    ["laura.taylor1234@example.com","test123","valid"],
    ["invaliduser@example.com","test321","invalid"],
    ["validuser@example.com","testxyz","invalid"]
];

    test.describe("Login data driven test", async()=>{
        for(const [email,password,validity] of userData){

            test(`login test for ${email}`,async({page})=>{
            await page.goto("https://demowebshop.tricentis.com/login")

            await page.locator("#Email").fill(email)
            await page.locator("#Password").fill(password)
            await page.locator("input[value='Log in']").click()

            if(validity.toLowerCase() === "valid"){

                const logoutLink = page.locator('a[href="/logout"]');
                await expect(logoutLink).toBeVisible({timeout:5000})
            }else{
                const errorMsg = await page.locator(".validation-summary-errors span").innerText()
                console.log(errorMsg)
                expect(errorMsg).toContain("Login was unsuccessful. Please correct the errors and try again.")

                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login")

            }
        })
    }      
 })


