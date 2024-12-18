import { test, expect } from '@playwright/test';
const baseUrl = 'https://beta.mamamia.app';
const users = [
  { email: 'cga@cga.pl', password: 'test', url: '**/caregiver-agency/dashboard' },
  { email: 'cg@cg.pl', password: 'test', url: '**/caregiver/jobs' },
  { email: 'sa@sa.pl', password: 'test', url: '**/service-agency/dashboard' },
  { email: 'customer@customer.pl', password: 'test', url: '**/customer/caregivers' }
];

for (const user of users) {
  test(`login for ${user.email}`, async ({ page }) => {
    await login(page, user.email, user.password, user.url);
  });
}

async function login(page, email, password, expectedUrl) {
  await page.goto(baseUrl + '/login');
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  const button = page.locator('text=Login');
  await button.click();
  await page.waitForURL(expectedUrl);
}