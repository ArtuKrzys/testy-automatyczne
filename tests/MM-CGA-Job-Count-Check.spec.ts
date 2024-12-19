import { test, expect } from '@playwright/test';
import { login } from './utils';

const user = {
  email: 'vitanas-pl@mamamia.app', 
  password: 'test', 
  url: '**/caregiver-agency/dashboard',
};

test('Job count check', async ({ page }) => {
  await login(page, user.email, user.password, user.url);

  const offersButton = page.locator('a[href="/caregiver-agency/job-market"]');
  await expect(offersButton).toBeVisible();
  await offersButton.click();
  await page.waitForURL(/\/caregiver-agency\/job-market/); 

  const numberOfOffers = page.locator('[data-test-attr="number-job-market-total"]');
  await page.waitForLoadState('networkidle');
  await expect(numberOfOffers).toBeVisible();

  const text = await numberOfOffers.innerText();
  const number = parseInt(text, 10);

  console.log(`Job count: ${number}`);
  expect(number).toBeGreaterThan(0);
});
