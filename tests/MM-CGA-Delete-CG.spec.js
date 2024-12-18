import { test, expect } from '@playwright/test';

test('Delete CG which was created by form', async ({ page }) => {
    // login to app
    await page.goto('https://beta.mamamia.app/login');
    await page.waitForLoadState('networkidle');
    const input_login = page.getByPlaceholder('Wprowadź swój adres e-mail lub numer telefonu');
    await input_login.fill('vitanas-pl@mamamia.app');
    const input_pass = page.getByPlaceholder('Wprowadź hasło');
    await input_pass.fill('test');
    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click()
    await expect(page).toHaveURL('https://beta.mamamia.app/caregiver-agency/dashboard')

    //Caregiver list navigation
    await page.goto('https://beta.mamamia.app/caregiver-agency/caregivers/all');
    await page.waitForLoadState('networkidle')
    
    //Search for Caregiver and validate if exists
    const search_bar = page.locator('[data-pc-name="inputtext"]')
    await search_bar.fill('Test Automation')
    await page.waitForSelector('text="Test Automation"')
    const caregiverExists = await page.locator('text="Test Automation"').count();
    if (caregiverExists === 0) {
    console.error('Caregiver not found. Skipping deletion.');
    return;
}

    //Navigate to certain Caregiver 
    const appButton = page.getByText('Test Automation')
    await appButton.click()
    await page.waitForLoadState('networkidle')

    //Navigate to Caregiver profile
    const profileButton = page.locator('button[data-test-attr="button-profile-redirect"]');
    await profileButton.click();
    
    //Delete Caregiver
    const deleteButton= page.locator('button[data-test-attr="button-delete-caregiver"]'); 
    await deleteButton.click()

    // Delete Caregiver Modal
    const deleteButton2 = page.locator('button[data-test-attr="button-delete-caregiver-modal"]');
    await deleteButton2.click()
    await page.waitForLoadState('networkidle')

    // Delete assertion
    await page.waitForLoadState('networkidle');

   


 
})

