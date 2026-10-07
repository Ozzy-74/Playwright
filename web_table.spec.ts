import { test, expect } from "@playwright/test";

test("valiadte product table",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay.html")

    //select table
    const table = page.locator('table').first()
    const headers = table.locator('tr th')
    const rows = table.locator("tbody tr")

    //count of rows and column
    await expect(headers).toHaveCount(5)
    await expect(rows).toHaveCount(4)

    //read all data from second row
    const secondRow= rows.nth(2).locator('td')
    
    console.log(await secondRow.allInnerTexts())
    await expect(secondRow).toHaveText([ 'Keyboard', 'Electronics', '$79', '0', 'Out of Stock' ])

    //read all data from the table, exclude header
    const tableData:string[][]=[]
    const rowsCount= await rows.count()

    for(let i=0; i<rowsCount; i++){
        const cellData = await rows.nth(i).locator('td').allInnerTexts()
        tableData.push(cellData)
        console.log(cellData)

    }

    //print particular row
    console.log("Particular product:",  tableData[2])

    //print all product names: expected> [ 'Laptop', 'Electronics', '$999', '15', 'In Stock' ]

    const productNames = []

    for(let i=0; i<tableData.length;i++){
        //console.log("Only products:",tableData[i][0])
        productNames.push(tableData[i][0])
    }

    console.log("Product names:",productNames)
    expect(productNames).toEqual([ 'Laptop', 'Mouse', 'Keyboard', 'Monitor' ])

    await page.close()
    
    //print products where stock = 0, expected >keyboard

    const outStock=[];

    for(let i=0;i<tableData.length;i++){
        if(tableData[i][3] === '0'){

            outStock.push(tableData[i][0])
        }
    }
    expect(outStock).toEqual(['Keyboard'])

    //print products name where status = instock

    const inStock=[];
    for(let i=0;i<tableData.length;i++){
        if(tableData[i][4] === "In Stock"){
            inStock.push(tableData[i][0])
        }
    }
    
    console.log("Instock items:",inStock)
    expect(inStock).toEqual([ 'Laptop', 'Mouse', 'Monitor' ])

    //count no.of products in in-stock and out of stock
    expect(outStock.length).toBe(1)
    expect(inStock.length).toBe(3)

    //price of specific product (eg: mouse)

    const priceOfProduct =[]

    for(let i=0;i<tableData.length;i++){
        if(tableData[i][0] === "Mouse"){
            console.log(priceOfProduct.push(tableData[i][2]))
            break

        }
    }
    expect(priceOfProduct).toEqual(["$29"])
    console.log("Price of mouse;",priceOfProduct)

    //calculate total price of all the products

    let totalPrice = 0;

    for(let i=0;i<tableData.length;i++){
        totalPrice += Number(tableData[i][2].replace('$','')) //convert string into number also removes $
    }

    console.log("Total price of products:", totalPrice)
    expect(totalPrice).toBe(1456)
})