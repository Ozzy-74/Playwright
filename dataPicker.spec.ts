import { test, expect, Page } from "@playwright/test";

async function selectDate(page:Page,targetYear:string,targetMonth:string,targetDay:string,isFuture:boolean){

    while(true){

         if (page.isClosed()) {
            throw new Error("Page was closed while selecting date");
        }

        const currentMonth = await page.locator(".ui-datepicker-month").innerText()
        const currentYear = await page.locator(".ui-datepicker-year").innerText()


        if(currentMonth===targetMonth && currentYear===targetYear){
            break;

        }

        if(isFuture){
            await page.locator('.ui-datepicker-next').click() //next button

        }
        else{
            await page.locator(".ui-datepicker-prev").click() //prev button
        }
    }

    //date selection
    const dates = await page.locator(".ui-datepicker-calendar td").all()

    // for(let date of dates){
    //     const dateText = await date.innerText()

    //     if(dateText === targetDay){
    //         await date.click()
    //         break;
    //     }
    // }

    await page.locator(".ui-datepicker-calendar td",{hasText:targetDay}).first().click() //another way
}
   
test("jQuery date picker",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay.html")

    const dateInput = page.locator('#datepicker1')
    await expect (dateInput).toBeVisible()

    //Direct set the date
    //await dateInput.fill("09/20/2026")

    //Automate date picker
    await dateInput.click()

    const targetYear = '2027'
    const targetMonth = 'June'
    const targetDay = '15'

    await selectDate(page,targetYear,targetMonth,targetDay,true) //false = past ,true = future

   await expect(dateInput).toHaveValue("06/15/2027") //mm//dd//yyyy
})

