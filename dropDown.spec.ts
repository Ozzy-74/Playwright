import {expect, test} from "@playwright/test"
import { beforeEach } from "node:test"

test.describe("Drop-downs test",()=>{
    test.beforeEach(async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")

    await expect(page.getByText("AutoPlay")).toBeVisible()
    });

    test("single select drop-down",async({page})=>{
        const countrySelect=await page.locator('#country')
        await expect(countrySelect).toBeVisible();

        //check default selection is india
        await expect(countrySelect).toHaveValue("india")

        //select by visible label
        await countrySelect.selectOption({label: "USA"})
        await expect(countrySelect).toHaveValue("usa")

        //select by value
        await countrySelect.selectOption({value:'uk'})
        await expect(countrySelect).toHaveValue('uk')

        //select by index
         await countrySelect.selectOption({index:3})
        await expect(countrySelect).toHaveValue("germany")

        //validate dropdown option count
        const options = countrySelect.locator("option")
        await expect(options).toHaveCount(5)

        const optionMultiple=page.locator("#country option")
        await expect(optionMultiple).toHaveCount(5)

        //validate options contains Germany

        const optionText=await options.allTextContents()
        expect(optionText).toContain("Germany")

        //print option text

        for(const opt of optionText){
            console.log(opt)
        }

    })

    test ("multi select drop-down",async({page})=>{
        const colorSelect = page.locator("#colors")
        await expect(colorSelect).toBeVisible()

        await expect(colorSelect).toHaveValue('blue')

        await colorSelect.selectOption([{label: "Red"},{label:"Green"},{label:"Yellow"}]) 
    })

    test("sorted options in a dropdown", async({page})=>{
        //const dropdownOptions =  await page.locator("#sorted option").allTextContents()
        const dropdownOptions =  await page.locator("#colors option")
        const optionText =await dropdownOptions.allInnerTexts()

        console.log("Options in the drop-down:",optionText)

        //original array
        const ogList = optionText
        console.log("original list:",ogList)

        //sort the options
        const sortedList=[...optionText].sort() //spread operator create new array

        console.log("original lsit",ogList)
        console.log("sorted list",sortedList)

        expect(optionText).toEqual(sortedList)

    })
    

})