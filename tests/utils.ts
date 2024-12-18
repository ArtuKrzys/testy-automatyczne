/**
 * Funkcja do losowego wyboru i kliknięcia elementu
 * @param {import('@playwright/test').Page} page - Obiekt strony
 * @param {string} fieldId - ID pola formularza
 * @param {number} optionsCount - Liczba dostępnych opcji (2, 3 lub 4)
 * @returns {Promise<number>} Wybrany numer
 */
async function selectRandomChoice(page, fieldId, optionsCount) {
    const choices = Array.from({ length: optionsCount }, (_, i) => i + 2);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    const selector = `#choices--input_${fieldId}-item-choice-${randomChoice}`;
    
    await page.locator(`#field_${fieldId}`).click();
    await page.locator(selector).waitFor({ state: 'visible' });
    await page.locator(selector).click();
    
    return randomChoice;
}

/**
 * Funkcja do generowania losowej daty
 * - Rok 2024: tylko grudzień
 * - Rok 2025: wszystkie miesiące i dni
 * @returns {string} Data w formacie YYYY-MM-DD
 */
function getRandomDate() {
    // Losowy rok
    const year = Math.random() < 0.5 ? 2024 : 2025;

    // Losowy miesiąc
    const month = year === 2024 ? 11 : Math.floor(Math.random() * 12); // Grudzień (11) dla 2024, dowolny miesiąc dla 2025

    // Obliczanie maksymalnego dnia w miesiącu
    const maxDay = new Date(year, month + 1, 0).getDate(); // Ostatni dzień miesiąca
    const day = Math.floor(Math.random() * maxDay) + 1;

    // Utwórz datę
    const date = new Date(year, month, day);

    // Formatowanie daty do YYYY-MM-DD
    return date.toISOString().split('T')[0];
}

/**
 * Funkcja generująca 9-cyfrowy losowy numer telefonu
 * z prefiksami od 601 do 609 oraz 6 losowymi cyframi
 * @returns {string} Losowy numer telefonu w formacie "601123456"
 */
function generateRandomNineDigits() {
    // Dostępne prefiksy numerów telefonów
    const prefixes = ['601', '602', '603', '604', '605', '606', '607', '608', '609'];

    // Wybieranie losowego prefiksu z listy
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    // Generowanie 6 losowych cyfr
    const randomDigits = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join('');

    // Łączenie prefiksu z losowymi cyframi, tworząc pełny numer telefonu
    const phoneNumber = `${prefix}${randomDigits}`;

    return phoneNumber;
}



// Eksport funkcji
module.exports = {
    selectRandomChoice,
    getRandomDate,
    generateRandomNineDigits,
};