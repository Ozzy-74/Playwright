// frontend url : http://localhost/opencart/upload/
// Backend admin: http://localhost/opencart/upload/admin/index.php
//admin/admin

//DB url: http://localhost/phpmyadmin/
import { test, expect } from "@playwright/test"
import { executeQuery } from "K:\\Testleaf-working\\revise\\Database testing\\dbClient"

test.describe("Opencart customer register and database validation", () => {

    const timestamp = Date.now()

    const customer = {
        firstName: "krishna",
        lastName: "Kumar",
        email: `Krish${timestamp}@gmail.com`,
        telephone: "74185296",
        password: "Asdf@1234",
        status: "Enabled"
    };

    test("Customer register", async ({ page }) => {
        await page.goto("http://localhost/opencart/upload/")
        await page.getByRole('link', { name: " My Account" }).click()
        await page.getByRole('link', { name: "Register", exact: true }).click()
        await page.getByPlaceholder("First Name").fill(customer.firstName)
        await page.getByPlaceholder("Last Name").fill(customer.lastName)
        await page.getByPlaceholder("E-Mail").fill(customer.email)
        await page.getByPlaceholder("Telephone").fill(customer.telephone)
        await page.getByPlaceholder("Password", { exact: true }).fill(customer.password)
        await page.getByPlaceholder("Password Confirm", { exact: true }).fill(customer.password)
        await page.locator('input[name="agree"]').check()
        await page.getByRole('button', { name: "Continue" }).click()
        await expect(page.locator("#content h1")).toContainText("Your Account Has Been Created")
        console.log("Customer regsiter", customer)
        await page.close()

        //admin page
        const adminPage = await page.context().newPage()
        await adminPage.goto("http://localhost/opencart/upload/admin/index.php")
        await adminPage.getByRole('textbox', { name: "Username" }).fill("admin")
        await adminPage.getByRole('textbox', { name: "Password" }).fill("admin")
        await adminPage.getByRole('button', { name: " Login" }).click()

        try {
            await adminPage.locator('button[type="button"]').click({ timeout: 3000 })
        } catch { }

        await adminPage.getByRole('link', { name: "Customers" }).click()
        await adminPage.getByRole('link', { name: "Customers" }).nth(1).click()
        const customerRow = await adminPage.locator("table tbody tr", { hasText: customer.email })
        await expect(customerRow).toHaveCount(1)
        await expect(customerRow).toContainText(customer.firstName)


        //Database validation
        const sql = `SELECT firstname, lastname, email, date_addedFROM oc_customerWHERE email = ?`;

        const dbResult = await executeQuery(sql, [customer.email]);

        console.log("Database result:", dbResult);

        expect(dbResult).toHaveLength(1);

        expect(dbResult[0].firstname).toBe(customer.firstName);
        expect(dbResult[0].lastname).toBe(customer.lastName);
        expect(dbResult[0].email).toBe(customer.email);
    })
})