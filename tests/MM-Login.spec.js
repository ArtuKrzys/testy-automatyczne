// @ts-check
const { test, expect } = require('@playwright/test');
const exp = require('constants');


test('Login full flow', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  const title= page.getByRole('heading', {name:'Sign in'})
  await expect(title).toHaveText('Sign in');

  // CGA correct login validation

  await page.getByPlaceholder('Enter your e-mail').fill('cga@cga.pl');
  await page.getByPlaceholder('Enter your password').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('load')
  await expect(page.getByText('Najnowsze aktywnosci')).toBeVisible();
  const currentURL = await page.url();
  await expect(currentURL).toBe('https://beta.mamamia.app/caregiver-agency/dashboard');







});

// test('CGA correct login validation', async ({ page }) => {
//   await page.goto('/');
//   await page.getByPlaceholder('Enter your e-mail').fill('cga@cga.pl');
//   await page.getByPlaceholder('Enter your password').fill('test');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.waitForLoadState('load')
//   await expect(page.getByText('Hello, Marek!')).toBeVisible();
//   const currentURL = await page.url();
//   await expect(currentURL).toBe('https://dev.mamamia.app/caregiver-agency/dashboard');
  

// } )

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
