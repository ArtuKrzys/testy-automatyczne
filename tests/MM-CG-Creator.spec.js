// @ts-check
import { test, expect } from '@playwright/test';
const { selectRandomChoice, getRandomDate, generateRandomNineDigits } = require('./utils');
// const { test, expect } = require('@playwright/test');



test.describe('Multistep registration form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://vitanas.wwwclient.pl/rejestracja-samemu/');
        // Weryfikacja czy strona się załadowała
        await expect(page).toHaveURL(/.*rejestracja-samemu/);
    });

    test('complete registration successfully with valid data', async ({ page }) => {
        // Step 1 - First selection
        const firstChoice = await selectRandomChoice(page, '2_4', 3);
        await expect(page.locator(`#choices--input_2_4-item-choice-${firstChoice}`)).toHaveAttribute('aria-selected', 'true');

        // Second selection
        const secondChoice = await selectRandomChoice(page, '2_31', 3);
        await expect(page.locator(`#choices--input_2_31-item-choice-${secondChoice}`)).toHaveAttribute('aria-selected', 'true');

        // Third selection
        const thirdChoice = await selectRandomChoice(page, '2_7', 2);
        await expect(page.locator(`#choices--input_2_7-item-choice-${thirdChoice}`)).toHaveAttribute('aria-selected', 'true');

        // Fourth selection
        const fourthChoice = await selectRandomChoice(page, '2_8', 2);
        await expect(page.locator(`#choices--input_2_8-item-choice-${fourthChoice}`)).toHaveAttribute('aria-selected', 'true');

        // Fifth selection
        const fifthChoice = await selectRandomChoice(page, '2_9', 2);
        await expect(page.locator(`#choices--input_2_9-item-choice-${fifthChoice}`)).toHaveAttribute('aria-selected', 'true');

        // Sixth selection 
        const sixthChoice = await selectRandomChoice(page, '2_10', 3);
        await expect(page.locator(`#choices--input_2_10-item-choice-${sixthChoice}`)).toHaveAttribute('aria-selected', 'true');

        // Seventh selection 
        const seventhChoice = await selectRandomChoice(page, '2_11', 3);
        await expect(page.locator(`#choices--input_2_11-item-choice-${seventhChoice}`)).toHaveAttribute('aria-selected', 'true');

        // Go to next step
        await page.locator('#gform_next_button_2_1').click();
        await expect(page).toHaveURL('https://vitanas.wwwclient.pl/rejestracja-samemu/#gf_2');

        // Click back button
        await page.waitForLoadState('networkidle')
        await page.locator('#gform_previous_button_2_19').click()
        // @ts-ignore
        await page.locator('//*[@id="field_2_25"]/h3').textContent('Jakie masz oczekiwania dotyczące sytuacji pacjenta?');
        await expect(page).toHaveURL(/.*rejestracja-samemu/);

        // Validate previous choices are still selected
        await expect(page.locator('#input_2_4')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_31')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_7')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_8')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_9')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_10')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_11')).toHaveAttribute('data-choice', 'active');

        // Go to next step
        await page.locator('#gform_next_button_2_1').click();
        await expect(page).toHaveURL('https://vitanas.wwwclient.pl/rejestracja-samemu/#gf_2');

        // Step 2 - First selection
        await page.locator('//*[@id="field_2_12"]/div/div/div[1]/div/div').click() 
        const step_2_first_Choice = await selectRandomChoice(page, '2_12', 2);
        await expect(page.locator(`#choices--input_2_12-item-choice-${step_2_first_Choice}`)).toHaveAttribute('aria-selected', 'true');

        // Step 2 - Second selection
        
        const step_2_second_Choice = await selectRandomChoice(page, '2_29', 43);
        await page.waitForTimeout(1000)
        await expect(page.locator(`#choices--input_2_29-item-choice-${step_2_second_Choice}`)).toHaveAttribute('aria-selected', 'true');

        // Step 3 - third selection
        await page.locator('//*[@id="field_2_14"]/div/div/div[1]/div/div').click()
        const step_2_third_Choice = await selectRandomChoice(page, '2_14', 4);
        await expect(page.locator(`#choices--input_2_14-item-choice-${step_2_third_Choice}`)).toHaveAttribute('aria-selected', 'true');

        // Step 4 - fourth selection
        await page.locator('//*[@id="field_2_15"]/div/div/div[1]/div/div').click()
        const step_2_fourth_Choice = await selectRandomChoice(page, '2_15', 2);
        await expect(page.locator(`#choices--input_2_15-item-choice-${step_2_fourth_Choice}`)).toHaveAttribute('aria-selected', 'true');

        // Step 5 - fifth selection
        await page.locator('//*[@id="field_2_16"]/div/div/div[1]/div/div').click()
        const step_2_fifth_Choice = await selectRandomChoice(page, '2_16', 2);
        await expect(page.locator(`#choices--input_2_16-item-choice-${step_2_fifth_Choice}`)).toHaveAttribute('aria-selected', 'true');

        // Step 6 - sixth selection
        await page.locator('//*[@id="field_2_17"]/div/div/div[1]/div/div').click()
        await page.locator('//*[@id="field_2_17"]/div/div/div[1]/div/div').click()
        const step_2_sixth_Choice = await selectRandomChoice(page, '2_17', 33);
        await expect(page.locator(`#choices--input_2_17-item-choice-${step_2_sixth_Choice}`)).toHaveAttribute('aria-selected', 'true');

        // Step 7 - seventhh selection
        await page.locator('//*[@id="field_2_18"]/div/div/div[1]/div/div').click()
        const step_2_seventh_Choice = await selectRandomChoice(page, '2_18', 5);
        await expect(page.locator(`#choices--input_2_18-item-choice-${step_2_seventh_Choice}`)).toHaveAttribute('aria-selected', 'true');

        // Go to next step
        await page.locator('#gform_next_button_2_19').click();
        await expect(page).toHaveURL('https://vitanas.wwwclient.pl/rejestracja-samemu/#gf_2');
        await expect(page.locator('#field_2_28')).toHaveText('Dostęp do systemu')

         // Click back button
         await page.waitForLoadState('networkidle')
         await page.locator('#gform_previous_button_2').click()
         // @ts-ignore
         await page.locator('//*[@id="field_2_26"]/h3').textContent('Twoje dane podstawowe i kwalifikacje');

         // Validate previous choices are still selected
        await expect(page.locator('#input_2_12')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_29')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_14')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_15')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_16')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_17')).toHaveAttribute('data-choice', 'active');
        await expect(page.locator('#input_2_18')).toHaveAttribute('data-choice', 'active');

        // Go to next step
        await page.locator('#gform_next_button_2_19').click();
        await expect(page).toHaveURL('https://vitanas.wwwclient.pl/rejestracja-samemu/#gf_2');
        await expect(page.locator('#field_2_28')).toHaveText('Dostęp do systemu')

        // Step-3 - First selection
        await page.locator('#input_2_20').fill('Test')

        // Step-3 - Second selection
        await page.locator('#input_2_21').fill('Automation')

        // Step-3 - Third selection
        const randomPhone = generateRandomNineDigits()
        await page.locator('#input_2_22').fill(randomPhone)

        // Step-3 - Fourth selection
        const randomDate = getRandomDate()
        await page.locator('#input_2_34').fill(randomDate)

        // Step-3 - Fifth selection
        await page.locator('//*[@id="field_2_23"]/div/div/div[1]/div/div').click()
        const step_3_fifth_Choice = await selectRandomChoice(page, '2_23', 2);
        await expect(page.locator(`#choices--input_2_23-item-choice-${step_3_fifth_Choice}`)).toHaveAttribute('aria-selected', 'true');

        // Step-3 - Sixth selection
        await page.locator('#choice_2_24_1').click()

        // Step-3 - Click next button
        await page.locator('#gform_submit_button_2').click()

    });

    // Warto dodać więcej scenariuszy testowych
    // test('validate required fields', async ({ page }) => {
        // TODO: Implementacja testu walidacji
    // });
});