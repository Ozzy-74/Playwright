import { test, expect } from "@playwright/test";
import fs from "fs"
import tokenData from "K:\\Testleaf-working\\revise\\API Testing\\testdata\\bearerToken.json"

test.describe.serial("File upload & download", () => {
        let uploadTextfile: string
        let code:string
    test("Upload the file", async ({ request }) => {

       

        const response = await request.post("https://upload.gofile.io/uploadfile", {

            headers: {
                Authorization: `Bearer ${tokenData.token}`
            },

            multipart: {
                file: {
                    name: 'UploadFile.txt',
                    mimeType: 'text/plain',
                    buffer: fs.readFileSync("K:\\Testleaf-working\\revise\\API Testing\\testdata\\UploadFile.txt")
                }
            }
        })

        expect(response.status()).toBe(200)

        const responseBody = await response.json()
        console.log(responseBody)

        expect(responseBody.data.name).toBe("UploadFile.txt")
        uploadTextfile = await responseBody.data.name
        code = await responseBody.data.code
        console.log("Uploaded file:", uploadTextfile)


    });

    test("Downlaod file",async({request})=>{
       const response =  await request.get(`https://api.gofile.io/contents/${code}`,{
            headers:{
                Authorization: `Bearer ${tokenData.token}`
            }
        })
        expect(response.status()).toBe(200)
        const responseBody = await response.json()
        const downloadLink = responseBody.data.link
        console.log("Download link:", downloadLink)

        const downloadResponse = await request.get(downloadLink)
        expect(downloadResponse.status()).toBe(200)
        const fileBuffer =  await downloadResponse.body()
        
        fs.writeFileSync("K:\\Testleaf-working\\revise\\API Testing\\testdata\\DownloadedFile.txt",fileBuffer)
        
    })
});