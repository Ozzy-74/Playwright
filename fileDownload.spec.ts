import {expect, test} from "@playwright/test"
import * as fs from "fs"
import { isContext } from "vm"

test.beforeEach("Navigate to file upload page",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay")
    await expect(page).toHaveURL(/autoplay/)
})

test("File download",async({page}) =>{


    const [download] = await Promise.all([page.waitForEvent('download'),page.locator('button',{hasText:"Download File"}).click()])

expect(download.suggestedFilename()).toContain('sample.txt')
   await download.saveAs("K:\\Testleaf-working\\data\\sample.txt")

  const fileExist =  fs.existsSync("K:\\Testleaf-working\\data\\sample.txt")
  expect(fileExist).toBeTruthy()

  if(fileExist){
    fs.unlinkSync("K:\\Testleaf-working\\data\\sample.txt")
  }
 
})

test("Open PDF",async({page}) =>{
    const [pdfPage] = await Promise.all([page.context().waitForEvent('page'),page.getByRole('button',{name:"Open PDF",exact:true}).click()])
console.log(pdfPage.context().pages().length)
    expect(pdfPage).toBeTruthy()

})