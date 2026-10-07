import { test, expect } from "@playwright/test";

test("Book a flight ticket with lowest price ",async({page})=>{
    await page.goto(" https://blazedemo.com/")

     await page.locator('select[name="fromPort"]').selectOption("Boston");

     await expect(page.locator('select[name="fromPort"]')).toHaveValue("Boston")

     await page.locator('select[name="toPort"]').selectOption("London");

     await expect(page.locator('select[name="toPort"]')).toHaveValue("London")

     await page.getByRole('button',{name:"Find Flights"}).click()

     const flightTable = page.locator("table")
     await expect(flightTable).toBeVisible()

     //Count number of flight rows

     const FlightRows = flightTable.locator('tbody tr')

     const RowCount = await FlightRows.count()
     console.log("Count of rows:",RowCount)

     expect(RowCount).toBeGreaterThan(0)

     //Read all data

     const flightData:string[][]=[]

     for(let i=0;i<RowCount;i++){
        const cellData = await FlightRows.nth(i).locator("td").allInnerTexts()

        flightData.push(cellData)
       
     }
      console.log(flightData)

     //print prices of all flight

     const prices:number[]=[]

     for(let i=0;i<flightData.length;i++){
        const priceText= flightData[i][5]

        const realPrice = Number(priceText.replace("$","").trim())
        prices.push(realPrice)
     }
     console.log(prices)

     //Identify the lowest price among all flights
     const lowestPrice = Math.min(...prices)
     console.log("Lowest flight price:" , lowestPrice)
     expect(lowestPrice).toBe(200.98)

     //find the index of lowest price
     const indexOflowestPrice = prices.indexOf(lowestPrice)
     console.log("Index of lowest price is:",indexOflowestPrice)

     // Select the lowest price row
     const lowestPriceRow = FlightRows.nth(indexOflowestPrice)
     await lowestPriceRow.highlight()

    expect(lowestPriceRow.locator('td').nth(5)).toHaveText(`$${lowestPrice}`)

    //select the choose flight button in the lowest price row
    const lowestPriceBtn = lowestPriceRow.getByRole('button',{name:"Choose This Flight"})
    await lowestPriceBtn.click()

    //passenger page
    await expect(page.getByRole('heading',{name:"Your flight from TLV to SFO has been reserved."})).toBeVisible()


    // Passenger details
    const PassangerName =  page.getByPlaceholder("First Last")
    await PassangerName.fill("krishna")
    expect(PassangerName).toHaveValue("krishna")

    const address = page.getByPlaceholder("123 Main St.")
    await address.fill("South street")
    expect(address).toHaveValue("South street")

    const city = page.getByPlaceholder("Anytown")
    await city.fill("Chennai")
    expect(city).toHaveValue("Chennai")

    const State = page.getByPlaceholder("State")
    await State.fill("Tamilnadu")
    expect(State).toHaveValue("Tamilnadu")

    const zipCode = page.getByPlaceholder("12345")
    await zipCode.fill("600021")
    expect(zipCode).toHaveValue("600021")

    const card = page.locator("#cardType")
    await card.selectOption("American Express")
    expect(card).toHaveValue("amex")

     const cardNumber = page.getByPlaceholder("Credit Card Number")
     await cardNumber.fill("12345687")
     expect(cardNumber).toHaveValue("12345687")

     const month = page.getByRole('textbox',{name:"Month",exact:true})
     await month.fill("10")
     expect(month).toHaveValue('10')

    const year = page.getByRole('textbox',{name:"Year",exact:true})
     await year.fill("2026")
     expect(year).toHaveValue('2026')

     const nameOnCard = page.getByRole('textbox',{name:"Name on Card",exact:true})
     await nameOnCard.fill("K R I S H")
     expect(nameOnCard).toHaveValue("K R I S H")

     const rememberMe = page.getByRole('checkbox',{name:"Remember me",exact:true})
     await rememberMe.check()
     expect(rememberMe).toBeChecked()

     const purchaseFlightBtn = page.getByRole('button',{name:"Purchase Flight",exact:true})
     await purchaseFlightBtn.click()
     
     await expect(page.getByRole('heading',{name:"Thank you for your purchase today!"})).toBeVisible() 

})