import { test, expect } from '@playwright/test';
const baseUrl = 'https://beta.mamamia.app';
const user = { email: 'cg@cg.pl', password: 'test', url: '**/caregiver/jobs' };

async function login(page, email, password, expectedUrl) {
    await page.goto(baseUrl + '/login');
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    const button = page.locator('text=Login');
    await button.click();
    await page.waitForURL(expectedUrl);
  }

test(`login cg and bottom navigation`, async ({ page }) => {
    await login(page, user.email, user.password, user.url);

    const offersDiv = page.locator('div.mx-auto.flex-1.text-nowrap.text-center.text-2xl.font-semibold.text-cg-500');
    await expect(offersDiv).toBeVisible();

    const jobsLink = page.locator('a[href="/caregiver/jobs"]');
    await expect(jobsLink).toHaveCount(1);

    const likedJobsLink = page.locator('a[href="/caregiver/liked-jobs"]');
    await expect(likedJobsLink).toHaveCount(1);

    const chatLink = page.locator('a[href="/caregiver/chat"]');
    await expect(chatLink).toHaveCount(1);
});

test(`login cg and change avaibility`, async ({ page }) => {
    const today = new Date();
    const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1);
    const nextMonthName = new Intl.DateTimeFormat('pl-PL', { month: 'long' }).format(nextMonthDate);
    console.log(`Next month name: ${nextMonthName}`);

    await login(page, user.email, user.password, user.url);

    const avaibilityDiv = page.locator('text=Oferty od daty:');
    await expect(avaibilityDiv).toBeVisible();
    await avaibilityDiv.click();

    const rightArrow = page.locator('button.p-datepicker-next');
    await rightArrow.click();

    const januaryDiv = page.locator(`text=${nextMonthName}`);
    await expect(januaryDiv).toBeVisible();

    await page.waitForSelector('table.p-datepicker-calendar');

    const availableDates = page.locator('td[data-pc-section="day"]:not(.p-disabled)');

    const count = await availableDates.count();

    if (count === 0) {
        throw new Error('No clickable dates found in the calendar!');
    }

    const randomIndex = Math.floor(Math.random() * count);

    await availableDates.nth(randomIndex).click();

    const clickedDate = await availableDates.nth(randomIndex).getAttribute('aria-label');
    console.log(`Clicked date: ${clickedDate}`);

    const button = page.locator('text=Pokaż pasujące oferty');
    await button.click()
});