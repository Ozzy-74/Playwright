import {expect, test} from "@playwright/test"
import { resolve } from "node:dns"
import { array } from "node:stream/iter"

test("Infinite scroll ",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")

    const dropdown = page.locator('#scrollable')

    await dropdown.evaluate(async(select:HTMLSelectElement)=>{
        while(true){
            const itemfound = Array.from(select.options).some(Option => Option.text === 'Item 100')
            if(itemfound){
                break;
            }
        }

        select.scrollTop = select.scrollHeight;

        await new Promise((resolve) => setTimeout(resolve,100))
       
        await dropdown.selectOption({label:"Item 50"})
        
    })
})