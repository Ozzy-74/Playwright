import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";
import { DateTime } from "luxon";

const BASE_URL = "https://restful-booker.herokuapp.com";
let bookingIds: number[] = [];

test.describe.serial("Create booking from Faker library", () => {

  test("Create multiple bookings", async ({ request }) => {

    bookingIds = [];

    for (let i = 0; i < 3; i++) {

      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const totalPrice = faker.number.int({ min: 100, max: 500 });
      const depositPaid = faker.datatype.boolean();

      const checkIn = DateTime.now().toFormat("yyyy-MM-dd");
      const checkOut = DateTime.now().plus({ days: 5 }).toFormat("yyyy-MM-dd");

      const requestPayload = {
        firstname: firstName,
        lastname: lastName,
        totalprice: totalPrice,
        depositpaid: depositPaid,
        bookingdates: {
          checkin: checkIn,
          checkout: checkOut,
        },
        additionalneeds: "Breakfast",
      };

      const response = await request.post(`${BASE_URL}/booking`, {
        data: requestPayload,
      });

      expect(response.status()).toBe(200);

      const responseBody = await response.json();

      expect(responseBody.bookingid).toEqual(expect.any(Number));
      expect(responseBody.booking.firstname).toBe(firstName);
      expect(responseBody.booking.lastname).toBe(lastName);
      expect(responseBody.booking.additionalneeds).toBe("Breakfast");

      bookingIds.push(responseBody.bookingid);

      console.log(`Booking ${i + 1}:`, responseBody);
      console.log("Booking ID:", responseBody.bookingid);
    }
  });

  test("GET all created bookings", async ({ request }) => {

    for (const bookingId of bookingIds) {
      const response = await request.get(`${BASE_URL}/booking/${bookingId}`);

      expect(response.status()).toBe(200);

      const userJSONResponse = await response.json();

      console.log(`Retrieved booking ID ${bookingId}:`, userJSONResponse);
    }
  });

  
});

