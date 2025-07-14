import { test, expect } from '@playwright/test';
import { MainPage } from '../../src/pages/MainPage.js';

test.describe('AcademyBugs UI Tests', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.open();
  });

  test('Bug Test 1: Form validation error', async ({ page }) => {
    // Попытка отправить пустую форму
    const bugResult = await mainPage.triggerBug1();

    expect(bugResult.found).toBe(true);
    expect(bugResult.message).toContain('error');

    // Дополнительные проверки
    await expect(page.locator('.error-message')).toBeVisible();
  });

  test('Bug Test 2: Navigation issue', async ({ page }) => {
    // Тест навигации с багом
    const bugResult = await mainPage.triggerBug2();

    expect(bugResult.found).toBe(true);

    // Проверка URL или состояния страницы
    await expect(page).toHaveURL(/.*error.*/);
  });

  test('Bug Test 3: Search functionality bug', async ({ page }) => {
    // Тест поиска с некорректными данными
    await mainPage.searchForBugs('"><script>alert("XSS")</script>');

    const bugResult = await mainPage.triggerBug3();
    expect(bugResult.found).toBe(true);
  });

  test('Bug Test 4: Button interaction bug', async ({ page }) => {
    // Тест взаимодействия с кнопками
    const bugResult = await mainPage.triggerBug4();

    expect(bugResult.found).toBe(true);

    // Проверка состояния элементов после бага
    await expect(page.locator('button')).toBeDisabled();
  });

  test('Bug Test 5: Data display bug', async ({ page }) => {
    // Тест отображения данных
    const bugResult = await mainPage.triggerBug5();

    expect(bugResult.found).toBe(true);

    // Проверка корректности отображения
    const displayedText = await mainPage.getText('.data-display');
    expect(displayedText).not.toBe('undefined');
  });
});
