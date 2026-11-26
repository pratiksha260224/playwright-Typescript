import { test, expect} from '@playwright/test'

function futureDateValue() {
  const date = new Date();
  date.setDate(date.getDate() + 7);

  const pad = (n) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

test("Event Ticket Booking Test Case", async({page})=>{

    await page.goto("https://eventhub.rahulshettyacademy.com");
    
    const USER_EMAIL = "pransh@email.com";
    const USER_PASSWORD = "PranshPP@11";
    const eventTitle = `Test Event ${Date.now()}`;

    await page.getByPlaceholder("you@email.com").fill(USER_EMAIL);
    await page.getByLabel("Password").fill(USER_PASSWORD);
    await page.locator("#login-btn").click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();


    await page.getByRole("button",{name: "Admin"}).nth(0).click();
    await page.getByText("Manage Events").nth(0).click();

    await page.getByPlaceholder("Event title").fill(eventTitle);

    await page.locator('#admin-event-form textarea').fill('Playwright test event');
    await page.getByLabel("City").fill("Mumbai");
    await page.getByLabel("Venue").fill("Taj Hotel");
    await page.getByLabel("Event Date & Time").fill(futureDateValue());
    await page.getByLabel("Price ($)").fill("99");
    await page.getByLabel("Total Seats").fill("50");
    await page.locator("#add-event-btn").click();

    await expect(page.getByText("Event created!")).toBeVisible();
    console.log(`Created event: "${eventTitle}"`);

    await page.locator("#nav-events").click();
    await page.getByTestId("event-card").first().waitFor();

    //const eventCards = page.getByTestId('event-card');
    //await expect(eventCards.first()).toBeVisible();
    
    //const targetCard = eventCards.filter({ hasText: eventTitle }).first();
    //await expect(targetCard).toBeVisible({ timeout: 5000 });

    const allEvent = await page.getByTestId("event-card");

    for (let i = 0; i < await allEvent.count(); i++) {

      const card = allEvent.nth(i);

      if ((await card.textContent()).includes(eventTitle)) {

        console.log("Event found");
        await expect(card).toBeVisible({ timeout: 5000 });
        break;
      }
    }

    const seatsBeforeBooking = parseInt(await allEvent.getByText('seat').first().innerText());
    console.log(`Seats before booking: ${seatsBeforeBooking}`);

    //await allEvent.getByTestId("book-now-btn").click();

    // const ticketCount = page.locator('#ticket-count');
    // await expect(ticketCount).toHaveText('1');


        
});



// Step 4 — Start booking

// - On the matched event card, click the Book Now button (locate by data-testid="book-now-btn" inside the card)



// Step 5 — Fill booking form

// - Assert: element with id #ticket-count has text 1 (default quantity)

// - Fill Full Name (locate by label Full Name)

// - Fill Email (locate by id #customer-email)

// - Fill Phone (locate by placeholder +91 98765 43210)

// - Click the confirm button (locate by CSS class .confirm-booking-btn)



// Step 6 — Verify booking confirmation

// - Locate the booking reference element (locate by CSS class .booking-ref, take .first())

// - Assert it is visible

// - Read its inner text, trim it — store as bookingRef



// Step 7 — Verify in My Bookings

// - Click the link View My Bookings

// - Assert: URL is BASE_URL/bookings

// - Get all booking cards (locate by id #booking-card)

// - Assert the first booking card is visible

// - Filter booking cards for the one that contains an element with class .booking-ref matching your bookingRef text

// - Assert that matched card is visible

// - Assert that matched card contains your eventTitle text



// Step 8 — Verify seat reduction

// - Navigate back to /events

// - Assert the first event card is visible

// - Filter cards again using hasText: eventTitle

// - Assert the card is visible

// - Read the seat count text again (same as Step 3) — store as seatsAfterBooking

// - Assert: seatsAfterBooking === seatsBeforeBooking - 1

