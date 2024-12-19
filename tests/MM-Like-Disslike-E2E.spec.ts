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
    console.log('test cg');
    await login(page, userCg.email, userCg.password, userCg.url);
    const modal = page.getByText('Aktualizacja dostępności');

    if (await modal.isVisible()) {
      page.getByText('Pokaż pasujące oferty pracy').click();
    } 

    // await page.waitForLoadState('networkidle')
    
    await page.getByText('Więcej szczegółów').first().click();
    await page.getByText('Pasuje mi').click();
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
    // await expect(page.getByText('Polubiłeś tę ofertę pracy').isVisible());

  });

  test('Test 2 - Dashboard SA', async ({ page }) => {
    await login(page, userSa.email, userSa.password, userSa.url);
    await page.waitForLoadState('networkidle');
    const row = page.locator('a.table-row', { hasText: 'Janina T.' });
    await expect(row).toBeVisible(); // Ensure the row is visible

    // Find the status of the caregiver
    const status = row.locator('[data-test-attr="badge-status__match"]'); 
    await expect(status).toHaveText('Match'); //Ensure the status is 'Match'

    console.log('Caregiver Janina T. has status Match.');


  });
});