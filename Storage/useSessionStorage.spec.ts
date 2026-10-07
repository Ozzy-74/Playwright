import { chromium } from "@playwright/test";
import fs from "fs"


async function useSessionStorage(){
    let browser = await chromium.launch()
    let context = await browser.newContext()
    let page = await context.newPage()

    const sessionStorage = JSON.parse(fs.readFileSync("./data/sessionStorage.json", "utf-8"))

    await context.addInitScript((storage)=>{
        for(const keys in storage){
            sessionStorage.setItem(keys, storage[keys])
        }

    },sessionStorage)

    await page.goto("https://sdetqa.vercel.app/login_app")

    await page.getByRole("textbox",{name:"Username"}).fill("admin")
    await page.getByRole('textbox',{name:"Password"}).fill("admin123")
    await page.getByLabel("⏳ Session").check()
    await page.getByRole("button",{name:" Login"}).click()

}

useSessionStorage()