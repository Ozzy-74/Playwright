import{test,expect} from "@playwright/test"
const BASE_URL = "https://restful-booker.herokuapp.com"
import fs from "fs"
let id: number;

const jsonPath = "K:\\Testleaf-working\\revise\\API Testing\\testdata\\post_request_body.json"
const loginData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"))

test.describe.serial("API of BOOKER ",()=>{
    test("Create booking using JSON data", async({request})=>{

    const response = await request.post(`${BASE_URL}/booking`,{data:loginData})
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