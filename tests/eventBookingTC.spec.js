import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

// ── Credentials ───────────────────────────────────────────────────────────────
const USER_EMAIL = 'pransh@email.com';
const USER_PASSWORD = 'PranshPP@11';

const eventTitle = `Test Event ${Date.now()}`;

// ── Helpers ──────────────────────────────────────────────────────────────────
async function login(page) {
  await page.goto(`${BASE_URL}/login`);

  // Located by placeholder
  await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);

  // Located by label
  await page.getByLabel('Password').fill(USER_PASSWORD);

  // Located by id
  await page.locator('#login-btn').click();

  //await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}


// ── Test ─────────────────────────────────────────────────────────────────────
test('create event via UI, book it, and verify seat reduction', async ({ page }) => {

  test.setTimeout(120000);

  // ── Step 1: Log in ─────────────────────────────────────────────────────────
  await login(page);


  // ── Step 2: Create a new event via the admin form ──────────────────────────
  await page.goto(`${BASE_URL}/admin/events`);

  // Located by id
  await page.locator('#event-title-input').fill(eventTitle);

  // Description — textarea in the form
  await page.locator('#admin-event-form textarea').fill('Playwright test event');

  // Located by label
  await page.getByLabel('City').fill('Test City');
  await page.getByLabel('Venue').fill('Test Venue');

  // datetime-local input
  await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');

  await page.getByLabel('Price ($)').fill('100');
  await page.getByLabel('Total Seats').fill('50');

  // Located by id
  await page.locator('#add-event-btn').click();

  // Wait for success toast
  await expect(page.getByText('Event created!')).toBeVisible();

  console.log(`Created event: "${eventTitle}"`);


  // ── Step 3: Find newly created event ───────────────────────────────────────
  await page.goto(`${BASE_URL}/events`);

  const eventCards = page.getByTestId('event-card');

  await expect(eventCards.first()).toBeVisible();

  // Find our exact event
  const targetCard = eventCards.filter({ hasText: eventTitle }).first();

  await expect(targetCard).toBeVisible({ timeout: 5000 });


  // ── Capture seats before booking ───────────────────────────────────────────
  const seatText = await targetCard.getByText(/seat/i).first().innerText();

  const seatMatch = seatText.match(/\d+/);

  expect(seatMatch).not.toBeNull();

  const seatsBeforeBooking = parseInt(seatMatch[0], 10);

  console.log(`Seats before booking: ${seatsBeforeBooking}`);


  // Click Book Now
  await targetCard
    .getByTestId('book-now-btn')
    .click();


  // ── Step 4: Fill booking form ──────────────────────────────────────────────

  // Quantity defaults to 1
  const ticketCount = page.locator('#ticket-count');

  await expect(ticketCount).toHaveText('1');

  // Located by label
  await page
    .getByLabel('Full Name')
    .fill('Test Student');

  // Located by id
  await page
    .locator('#customer-email')
    .fill('test.student@example.com');

  // Located by placeholder
  await page
    .getByPlaceholder('+91 98765 43210')
    .fill('9876543210');

  // Located by CSS class
  await page
    .locator('.confirm-booking-btn')
    .click();


  // ── Step 5: Verify booking confirmation ────────────────────────────────────

  const bookingRefEl = page
    .locator('.booking-ref')
    .first();

  await expect(bookingRefEl).toBeVisible();

  const bookingRef = (
    await bookingRefEl.innerText()
  ).trim();

  // Booking reference should start with first letter of event title
  expect(bookingRef.charAt(0))
    .toBe(eventTitle.trim().charAt(0).toUpperCase());

  console.log(`Booking confirmed. Ref: ${bookingRef}`);


  // ── Step 6: Verify booking appears in My Bookings ──────────────────────────

  await page
    .getByRole('link', { name: 'View My Bookings' })
    .click();

  await expect(page)
    .toHaveURL(`${BASE_URL}/bookings`);

  const bookingCards = page.locator('#booking-card');

  await expect(bookingCards.first()).toBeVisible();


  // Find booking card using the unique booking reference
  const matchingCard = bookingCards
    .filter({ hasText: bookingRef })
    .first();

  await expect(matchingCard).toBeVisible();

  // Verify event title also appears in the same booking card
  await expect(matchingCard)
    .toContainText(eventTitle);

  console.log(
    `Booking card found in My Bookings for ref: ${bookingRef}`
  );


  // ── Step 7: Verify seat count reduced ──────────────────────────────────────

  await page.goto(`${BASE_URL}/events`);

  const updatedEventCards = page.getByTestId('event-card');

  await expect(updatedEventCards.first()).toBeVisible();

  // Find the same event
  const updatedCard = updatedEventCards
    .filter({ hasText: eventTitle })
    .first();

  await expect(updatedCard).toBeVisible();


  // Read updated seat count
  const updatedSeatText = await updatedCard
    .getByText(/seat/i)
    .first()
    .innerText();

  const updatedSeatMatch = updatedSeatText.match(/\d+/);

  expect(updatedSeatMatch).not.toBeNull();

  const seatsAfterBooking = parseInt(
    updatedSeatMatch[0],
    10
  );

  console.log(
    `Seats after booking: ${seatsAfterBooking}`
  );


  // Booked exactly 1 ticket, so seats must decrease by exactly 1
  expect(seatsAfterBooking)
    .toBe(seatsBeforeBooking - 1);
});