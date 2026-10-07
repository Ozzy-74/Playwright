//install ajv package
import { test, expect } from "@playwright/test"
import Ajv from "ajv"

//1. https://mocktarget.apigee.net/json
test("Schema validation", async ({ request }) => {

    //Generate response
    const response = await request.get("https://mocktarget.apigee.net/json")
    const responseBody = await response.json()
    console.log(responseBody)

    //Define schema
    const schema1 = {
        "type": "object",
        "properties": {
            "firstName": {
                "type": "string"
            },
            "lastName": {
                "type": "string"
            },
            "city": {
                "type": "string"
            },
            "state": {
                "type": "string"
            }
        },
        "required": [
            "firstName",
            "lastName",
            "city",
            "state"
        ]
    }

    //Validate schema
    const ajv = new Ajv()
    const validate = ajv.compile(schema1) //ajv.compile() is an anonymous function, so i stored it in a variable to call the function 
    const isValid = validate(responseBody) //returns TRUE/FALSE
    expect(isValid).toBe(true)
})

//2. https://jsonplaceholder.typicode.com/

test("Schema validation on JSON ", async ({ request }) => {

    //Generate response
    const response = await request.get("https://jsonplaceholder.typicode.com/posts/1")
    const responseBody = await response.json()
    console.log(responseBody)

    //Define schema
    const schema2 = {

        "type": "object",
        "properties": {
            "userId": {
                "type": "integer"
            },
            "id": {
                "type": "integer"
            },
            "title": {
                "type": "string"
            },
            "body": {
                "type": "string"
            }
        },
        "required": [
            "userId",
            "id",
            "title",
            "body"
        ]
    }
    //Validate schema
   const ajv = new Ajv()
   const validate = ajv.compile(schema2)
   const isValid = validate(responseBody)
   expect(isValid).toBeTruthy()
})