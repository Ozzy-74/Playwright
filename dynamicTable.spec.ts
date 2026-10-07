import { test, expect } from "@playwright/test";

test.describe("Dynamic table",()=>{

    test.beforeEach("Navigate to page",async({page})=>{
        await page.goto("https://sdetqa.vercel.app/autoplay.html")
        await expect(page.getByText('AutoPlay')).toBeVisible()
    });

    test("CASE:1 chrome cpu load validation",async({page})=>{
        
        //locator-->array of locator
        const rows = await page.locator("#taskTable tbody tr").all()
        expect(rows.length).toBeGreaterThan(0)

        let cpuLoad="";

        for(const row of rows){

           const processName = await row.locator('td').nth(0).innerText()

           if(processName === "Chrome"){
                cpuLoad = await row.locator('td',{hasText:"%"}).innerText()

                const expectedCpu = await page.locator('strong.chrome-cpu').innerText()

                expect(cpuLoad).toBe(expectedCpu)
                break;
           }
        }
    })

    test("CASE:2 Firefox memory usage validation",async({page})=>{
        const rows = await page.locator("#taskTable tbody tr").all()
        expect(rows.length).toBeGreaterThan(0)

        let memoryUsage = "";

        for(const row of rows){
            const processName = await row.locator('td').nth(0).innerText()

            if(processName === "Firefox"){
                memoryUsage = await row.locator('td',{hasText:/MB$/}).innerText()

                const expectedMemory = await page.locator('strong.firefox-memory').innerText()

                expect(memoryUsage).toBe(expectedMemory)
                break;
            }
        }   
    })

    test("CASE:3 Chrome network speed validation",async({page})=>{
        const rows = await page.locator("#taskTable tbody tr").all()
        expect(rows.length).toBeGreaterThan(0)

        let networkSpeed = "";

        for(const row of rows){
            const processName = await row.locator('td').nth(0).innerText()

            if(processName === "Chrome"){
                networkSpeed = await row.locator('td',{hasText:/Mbps$/}).innerText()

                const expectedNetwork = await page.locator('strong.chrome-network').innerText()

                expect(networkSpeed).toBe(expectedNetwork)
                break;
            }
        }   
    })

}) 