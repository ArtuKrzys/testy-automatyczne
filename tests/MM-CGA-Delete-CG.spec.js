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
    const search_bar = page.getByPlaceholder('Search')
    await search_bar.fill('Test Automation')
    const caregiverExists = await page.locator('text="Test Automation"').count();
    if (caregiverExists === 0) {
    console.error('Caregiver not found. Skipping deletion.');
    return;
}

    //Navigate to certain Caregiver 
    const appButton = page.getByText('App+').nth(0)
    await appButton.click()

    //Navigate to Caregiver profile
    const profileButton = page.locator('button:has-text("Profile")').nth(1);
    await profileButton.click();

    //Delete Caregiver
    const deleteButton= page.locator('button:has-text("Delete caregiver")');
    await deleteButton.click()

    // Delete Caregiver Modal
    const deleteButton2 = page.locator('button:has-text("Remove caregiver")')
    await deleteButton2.click()

    // Delete assertion
    await search_bar.fill('Test Automation')
    await expect(page.locator('text="No results"')).toBeVisible();
 
   
    



})