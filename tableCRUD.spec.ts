import { test, expect } from "@playwright/test";

test("CRUD table", async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay.html")

    const table = page.locator('table[id="dynamicTable"]')
    const headers = table.locator("tr th")
    const rows = table.locator("tbody tr")
    const tableData:string[][]=[]
    const addButton = page.getByRole('button',{name:"+ Add",exact:true})
    const nameField = page.getByRole('textbox',{name:"Name",exact:true})
    const roleField = page.getByRole('textbox',{name:"Role",exact:true})
    const searchField = page.getByPlaceholder("Search table...")

    //verify the tale is visible
    await expect(table).toBeVisible()

    //verify table header is visible
    const headerTexts = await headers.allTextContents();
    console.log(headerTexts);
    await expect(headers).toHaveCount(4)

    //verify default data

    const rowsCount = await rows.count()
    for(let i=0; i<rowsCount;i++){
        const cellData = await rows.nth(i).locator("td").allInnerTexts()
        tableData.push(cellData)
        console.log(cellData)
    }

    const defaultData = []

    for(let i=0; i<tableData.length;i++){
        defaultData.push(tableData[i][1])
       
    }
    console.log("Default data:", defaultData)

    expect(defaultData).toEqual([ 'Alice', 'Bob' ])

    //verify add button is visible
    await expect(addButton).toBeVisible()

    //verify name , role field is visible

    await expect(nameField).toBeVisible()
    await expect(roleField).toBeVisible()
    await expect(nameField).toBeEditable()
    await expect(roleField).toBeEditable()

    //verify search field is visible
    await expect(searchField).toBeVisible()
    

    //Track before row count
    const beforeCount = await rows.count()
    console.log("Row count before add",beforeCount)
    //add record - enter new name&role and click add
    await nameField.fill("Krish")
    await roleField.fill("QA")
    await addButton.click()

    //verify row count increase
    await expect(rows).toHaveCount(beforeCount+1)
    const afterCount = await rows.count()
    console.log("Row count after add:",afterCount)

    expect(afterCount).toBe(beforeCount+1)

    



})