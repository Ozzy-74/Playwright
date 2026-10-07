import { test, expect } from "@playwright/test";
import fs from "fs"

const BASE_URL = "https://restful-booker.herokuapp.com";
let ID:number
let token:string
//Utility function to read JSON data from file
function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath,"utf-8"))
}

test(" Create, Get ,partial update and  Update a booking record", async({request})=>{

    //1.create a new booking
    const createBookingData = readJson("K:\\Testleaf-working\\revise\\API Testing\\testdata\\post_request_body.json")
    const createResponse = await request.post(`${BASE_URL}/booking`,{data:createBookingData})
    expect(createResponse.status()).toBe(200)
    const createdBooking = await createResponse.json()
    console.log(createdBooking)
    ID = createdBooking.bookingid
    console.log("BookingID:",ID)
    
    //2. Get created booking 
    const getResponse = await request.get(`${BASE_URL}/booking/${ID}`)
    expect (getResponse.ok()).toBeTruthy()
    console.log("Booking details before update::",await getResponse.json())

    //Create token - required to PUT,PATCH and DELETE
    const tokenData = readJson("K:\\Testleaf-working\\revise\\API Testing\\testdata\\token_request.json")
    const tokenResponse = await request.post(`${BASE_URL}/auth`,{data:tokenData})
    const tokenJson=  await tokenResponse.json()
    token = tokenJson.token
    expect(tokenJson).toHaveProperty("token")
    console.log("New TOKEN:", token)

    //3. Partial UPDATE
    const partial_updateData = readJson("K:\\Testleaf-working\\revise\\API Testing\\testdata\\patch_request.json")
    const updateResponse = await request.patch(`${BASE_URL}/booking/${ID}`, {
        headers:{
            "Content-Type": "application/json",
            "Cookie": `token=${token}`,
        },
        data:partial_updateData
    });
    expect(updateResponse.status()).toBe(200)
    expect(updateResponse.statusText()).toBe("OK")
    const partialUpdate = await updateResponse.json()
    console.log("After partial update::",partialUpdate)

    //4. Full update the booking using PUT request
      const full_updateData = readJson("K:\\Testleaf-working\\revise\\API Testing\\testdata\\put_request.json")
    const PutResponse = await request.put(`${BASE_URL}/booking/${ID}`, {
        headers:{
            "Content-Type": "application/json",
            "Cookie": `token=${token}`,
        },
        data:full_updateData
    });
    expect(PutResponse.status()).toBe(200)
    expect(PutResponse.statusText()).toBe("OK")
    const FullUpdate = await PutResponse.json()
    console.log("After Full Update::",FullUpdate)

    const deleteResponse = await request.delete(`${BASE_URL}/booking/${ID}`,{
        headers:{
            "Content-Type": "application/json",
            "Cookie": `token=${token}`
        }
    })
  
    expect(deleteResponse.status()).toBe(201)
    expect(deleteResponse.statusText()).toBe("Created")
    console.log("***Booking details are deleted***")
})
