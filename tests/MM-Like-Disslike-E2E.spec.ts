import { test, expect } from '@playwright/test';
import { login } from './utils';

const userCg = {
  email: 'cg@cg.pl', 
  password: 'test', 
  url: '**/caregiver/jobs'
};

let responseId;

const userSa = {
  email: 'vitanas-de@mamamia.app', 
  password: 'test', 
  url: '**/service-agency/dashboard'
};

test.describe.serial('Sequential Tests', () => {
  test('Test 1 - Caregiver like', async ({ page }) => {
    await login(page, userCg.email, userCg.password, userCg.url);
    const modal = page.getByText('Aktualizacja dostępności');

    if (await modal.isVisible()) {
      page.getByText('Pokaż pasujące oferty pracy').click();
    } 
    
    await page.getByText('Więcej szczegółów').first().click();
    await page.getByRole('button', { name: 'Pasuje mi' }).click();
    await page.waitForTimeout(2000);
    page.on('response', async response => {
      if (response.url() === 'https://backend.beta.mamamia.app/graphql') {
        const responseData = await response.json();
        // Zakładamy, że `id` znajduje się w obiekcie odpowiedzi
        responseId = responseData.data?.StoreInterest?.id;
        if (responseId) {
          console.log('ID found in response:', responseId);
        }
      }
    });
    // await expect(page.getByText('Idealne dopasowanie').isVisible());

  });

  test('Test 2 - Dashboard SA', async ({ page }) => {
    await login(page, userSa.email, userSa.password, userSa.url);
    await page.waitForLoadState('networkidle');
    const row = page.locator('a.table-row', { hasText: 'Janina T.' });
    await expect(row).toBeVisible(); // Ensure the row is visible

    // Find the status of the caregiver
    const status = row.locator('[data-test-attr="badge-status__match"]'); // Szymon prośba o zmianę tutaj na __like
    await expect(status).toHaveText('Match'); //Ensure the status is 'Match' - prośba o zmianę na 'Like' czy tam Caregiver intrest

    console.log('Caregiver Janina T. has status Match.');

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

  });

  test('Test 4 - SA dashboard check', async ({ page }) => {
    
    await login(page, userSa.email, userSa.password, userSa.url);
    await page.waitForLoadState('networkidle');
    //negative assertion
    const row = page.locator('a.table-row', { hasText: 'Janina T.' });
    await expect(row).not.toBeVisible(); // Ensure the row is not visible

  });
});