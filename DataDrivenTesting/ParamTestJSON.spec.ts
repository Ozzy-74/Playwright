import {test, chromium, expect} from "@playwright/test"
import fs from "fs"

//reading data from json

const jsonData = "K:/Testleaf-working/revise/Storage/data/Userdata.json"
const loginData: any = JSON.parse(fs.readFileSync(jsonData, "utf-8"))

    test.describe("Login data driven test", async()=>{
        for(const {email,password,validity} of loginData){

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
               console.log(`\x1b[31m${errorMsg}\x1b[0m`);
                expect(errorMsg).toContain("Login was unsuccessful. Please correct the errors and try again.")

                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login")

            }
        })
    }      
 })


