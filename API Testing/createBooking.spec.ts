/*
Test:  Create booking
Request Type: Post
Request Body: Static
*/
import{test,expect} from "@playwright/test"
import fs from "fs"
import path from "path";
const BASE_URL = "https://restful-booker.herokuapp.com"
let id: number;

test.describe.serial("API of BOOKER ",()=>{
    test("Create booking ", async({request})=>{

    const requestPayload = {
    "firstname" : "krishna",
    "lastname" : "kumar",
    "totalprice" : 500,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2026-01-01",
        "checkout" : "2026-09-03"
        },
    "additionalneeds" : "Breakfast"
    }

    const response = await request.post(`${BASE_URL}/booking`,{data:requestPayload})
    const responseBody = await response.json()
    console.log(responseBody)
    expect(response.status()).toBe(200)
    expect(response.statusText()).toBe("OK")
    expect(responseBody.bookingid).toBeTruthy()
    expect(responseBody.bookingid).toEqual(expect.any(Number))
    expect(responseBody.booking).toHaveProperty("firstname")
    expect(responseBody.booking.firstname).toBe("krishna")
    expect(responseBody.booking).toHaveProperty("lastname")
    expect(responseBody.booking.lastname).toBe("kumar")
    expect(responseBody.booking).toHaveProperty("additionalneeds")
    id = responseBody.bookingid
    console.log("ID:",id)

    })

    test("GET user data",async({request})=>{
    const response = await request.get(`${BASE_URL}/booking/${id}`)
    expect(response.status()).toBe(200)
    const userJSONResponse =await response.json()
    console.log(userJSONResponse)
    })

})
