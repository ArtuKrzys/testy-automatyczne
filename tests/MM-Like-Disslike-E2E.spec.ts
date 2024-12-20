import { test, expect } from '@playwright/test';
import { login } from './utils';

const userCg = {
  email: 'test@automatyczny.pl', 
  password: 'test', 
  url: '**/caregiver/jobs'
};

let responseId;

const userSa = {
  email: 'vitanas-de@mamamia.app', 
  password: 'test', 
  url: '**/service-agency/dashboard'
};

const backendURL = 'https://backend.beta.mamamia.app';

test.describe.serial('Sequential Tests', () => {
  test('Test 1 - Caregiver like', async ({ page }) => {
    await login(page, userCg.email, userCg.password, userCg.url);
    const modal = page.getByText('Aktualizacja dostępności');

    if (await modal.isVisible()) {
      page.getByText('Pokaż pasujące oferty pracy').click();
    } 
    
    await page.getByText('Więcej szczegółów').first().click();
    await page.getByRole('button', { name: 'Pasuje mi' }).click();

    const response = await page.waitForResponse(response =>
      response.url() === backendURL + '/graphql' &&
      response.request().postData()?.includes('StoreInterest')
    );
    
    expect(response).not.toBeNull();

    const responseBody = await response.json();
    responseId = responseBody.data?.StoreInterest.id; 

    expect(responseId).not.toBeUndefined();
    expect(Number.isInteger(responseId)).toBe(true);

  });

  test('Test 2 - Dashboard SA', async ({ page }) => {
    await login(page, userSa.email, userSa.password, userSa.url);
    await page.waitForLoadState('networkidle');
    const row = page.locator('a.table-row', { hasText: 'Nieusuwac T.' }); 
    await expect(row).toBeVisible(); // Ensure the row is visible

    // Find the status of the caregiver
    const status = row.locator('[data-test-attr="badge-status__caregiver_interest"]'); 
    await expect(status).toHaveText('Caregiver interest'); 

    const menuButton = page.locator('#headlessui-menu-button-1');
    await menuButton.click();
    const logoutButton = page.locator('[data-test-attr="button-header-logout"]')
    await logoutButton.click();
    await expect(page).toHaveURL('https://beta.mamamia.app/login');

  });

  test('Test 3 - CG App withdraw like', async ({ page }) => {
    
    await login(page, userCg.email, userCg.password, userCg.url);
    await page.getByText('pasuje mi').first().click();
    await page.getByText('Więcej szczegółów').first().click();
    await page.getByRole('button', { name: 'Pasuje mi' }).click();
    const request = await page.waitForRequest(request => 
      request.url() === backendURL +  '/graphql' && 
      request.postData()?.includes('DestroyInterest')
    );
  
    expect(request).not.toBeNull()

  });

  test('Test 4 - SA dashboard check', async ({ page }) => {
    
    await login(page, userSa.email, userSa.password, userSa.url);
    await page.waitForLoadState('networkidle');
    //negative assertion
    const row = page.locator('a.table-row', { hasText: 'Nieusuwac T.' });
    await expect(row).not.toBeVisible(); // Ensure the row is not visible

  });
});