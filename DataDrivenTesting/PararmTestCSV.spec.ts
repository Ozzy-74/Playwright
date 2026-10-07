
import {test, chromium, expect} from "@playwright/test"
import fs from "fs"
import {parse} from "csv-parse/sync"

//reading data from CSV

const csvPath = "K:/Testleaf-working/revise/Storage/data/Userdata.csv"
const fileContent = fs.readFileSync(csvPath, "utf-8")

const records:any = parse(fileContent,{columns:true, skip_empty_lines:true})

    test.describe("Login data driven test", async()=>{
        for(const data of records){

            test(`login test for ${data.email}`,async({page})=>{
            await page.goto("https://demowebshop.tricentis.com/login")

            await page.locator("#Email").fill(data.email)
            await page.locator("#Password").fill(data.password)
            await page.locator("input[value='Log in']").click()

            if(data.validity.toLowerCase() === "valid"){

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


