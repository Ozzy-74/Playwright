import { test, expect } from "@playwright/test";

test("Bootstrap dropdown",async({page})=>{
    //login
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    await expect(page.getByRole('heading',{name:"Login"})).toBeVisible()

    //enter username/password
    await page.locator('input[name="username"]').fill("Admin")
    await expect(page.locator('input[name="username"]')).toHaveValue("Admin")

    await page.locator('input[name="password"]').fill("admin123") 
    await expect(page.locator('input[name="password"]')).toHaveValue("admin123")

    //click login
    await page.locator('button[type="submit"]').click()
    await expect(page.getByRole('link',{name:"PIM"})).toBeVisible()

    //click on PIM
    await page.getByRole('link',{name:"PIM"}).click()

    //click job title drop-down
    const jobTitleDropdown  =  page.locator("form i").nth(2)
    await jobTitleDropdown.click()

      //check drop-downs optioins are visible
      const options = page.locator("div[role='listbox'] span")
      await expect(options.first()).toBeVisible()
    //await expect(page.locator('div[role="listbox"]span')).toBeVisible()

    //capturing the options
   
    
    //count number of options
    const count  = await options.count()
    console.log('Number of options in a drop-down:',count)

    //get text of all the elements
    const allTexts = await options.allTextContents();
    console.log(allTexts)

    //looping through each options

    for(let i=0;i<count;i++){
        const option =  options.nth(i)
        const optionText= await option.textContent()
        console.log(optionText)

        if(optionText === "Automaton Tester"){
           option.click()
            break;  
        }
    }

    await expect(page.locator('.oxd-select-text-input').nth(2)).toHaveText("Automaton Tester")


})