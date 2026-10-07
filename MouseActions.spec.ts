import { test, expect, Page } from "@playwright/test";

test.beforeEach("Navigate to home page",async({page})=>{
    await page.goto("https://sdetqa.vercel.app/autoplay.html")
})

test("Toggle button status",async({page})=>{

    const toggleBtn = page.locator('#toggleBtn');
    const orgText = await toggleBtn.textContent()
    await toggleBtn.click()
    const afterClickTxt = await toggleBtn.textContent()

    expect(orgText).not.toBe(afterClickTxt)
})

test("right click",async({page}) =>{
    const rightClickElement = page.locator("#rightClickBtn")
    await rightClickElement.click({button:"right"})

    const alloptions = await page.locator("#customContextMenu button").allInnerTexts()
    console.log(alloptions)
    expect(alloptions).toEqual([ 'Edit', 'Cut', 'Copy', 'Paste', 'Delete', 'Quit' ])
    
    const quitOption = page.locator('button',{hasText:"Quit"})
    await expect(quitOption).toBeVisible()

    page.once('dialog', (dialog) =>{
        expect(dialog.message()).toContain("Quit")
        dialog.accept()
    })
    await quitOption.click()
})

test("Tooltip hover",async({page})=>{
    const hoverBtn = page.locator("span:has-text('Hover me')")
 hoverBtn.hover;
 await expect(hoverBtn).toBeVisible()

 console.log("Attribute value:", await hoverBtn.getAttribute('title'))

expect(await hoverBtn.getAttribute('title')).toBe("This is a tooltip")

})

test("Drag and drop",async({page})=>{
    const sourceItem = page.getByText('Drag me',{exact:true})
    const targetItem = page.getByText('Drop zone',{exact:true})

    page.once('dialog',dialog=>{
        expect(dialog.message()).toContain("Dropped")
        dialog.accept()
    })
    await sourceItem.dragTo(targetItem)
})

test("Slider control",async({page})=>{

    const slider = page.locator("#priceSlider")
    await slider.focus()
    await page.keyboard.press('Home')

    //move the slider till 70
    for(let i=0; i<70;i++){
        await page.keyboard.press('ArrowRight')
    }
     await expect(slider).toHaveValue('70')

})

test("two pointer slider", async({page})=>{
    const amount = page.locator("#amount")
    const handles = page.locator( ".ui-slider-handle.ui-corner-all.ui-state-default" );
await expect(handles).toHaveCount(2);

const pointer1 = handles.nth(0)
const pointer2 =handles.nth(1)
 
   //await slider2.focus()
    await pointer1.focus()
    await page.keyboard.press("Home")
    for(let i=0; i<100;i++){
        await page.keyboard.press("ArrowRight")
    }
   

    await pointer2.focus()
    await page.keyboard.press("End")
    for(let i=0; i<200;i++){
        await page.keyboard.press("ArrowLeft")
    }
    
    expect(amount).toHaveValue("$100 - $300")

})
