import { test, expect } from '@playwright/test';
import { login } from './utils';

const user = {
  email: 'vitanas-pl@mamamia.app', 
  password: 'test', 
  url: '**/caregiver-agency/dashboard'
};


test('Job count check', async ({ page }) => {
  await login(page, user.email, user.password, user.url);
  const locator = page.locator('a', { hasText: /Oferty|Offers|Angebote/i });
  await locator.click();
  await expect(page).toHaveURL('/caregiver-agency/job-market');
   // Find an element that contains a number greater than 0 and the text (Job offers, open jobs, Jobs)
  const locator2 = page.locator('div', { hasText: /^[1-9][0-9]*\s*(Oferty pracy|open jobs|Jobs)$/ });
  // Get the text of the element and console log it
  const text = await locator2.textContent()
  console.log(text);
  // Expect the element to exist and be visible
  await expect(locator2).toBeVisible();
    
});