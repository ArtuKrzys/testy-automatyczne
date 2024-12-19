import { test, expect } from '@playwright/test';
import { login } from './utils';

const user = {
  email: 'vitanas-pl@mamamia.app', 
  password: 'test', 
  url: '**/caregiver-agency/dashboard'
};

test('Job count check', async ({ page }) => {
  await login(page, user.email, user.password, user.url);

  const offersButton = page.getByRole('link', { name: /Oferty|Offers|Angebote/i });
  await offersButton.click();
  await page.waitForURL(/\/caregiver-agency\/job-market/); 

  const numberOfOffers = page.locator('div', { hasText: /^[1-9][0-9]*\s*(Oferty pracy|open jobs|Jobs)$/ });
  await numberOfOffers.waitFor();

  const text = await numberOfOffers.textContent();
  console.log(`Extracted job count text: "${text}"`);

  const match = text?.match(/\d+/);
  expect(match).not.toBeNull(); // Ensure we found a number

  const number = parseInt(match[0], 10);
  console.log(`Job count: ${number}`);
  expect(number).toBeGreaterThan(0);
});
