import { test, expect } from '@playwright/test';
import { MainPage } from '../../src/pages/MainPage.js';

test.describe('Specific Bug Detection Tests', () => {
  let mainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.open();
  });

  test('Cross-site scripting vulnerability', async ({ page }) => {
    // Тест на XSS уязвимость
    await page.fill('input[name="search"]', '<script>alert("XSS")</script>');
    await page.click('button[type="submit"]');

    // Проверка на наличие алерта или ошибки
    const bugOverlay = await mainPage.checkForBugOverlay();
    expect(bugOverlay.found).toBe(true);
  });

  test('SQL injection attempt', async ({ page }) => {
    // Тест на SQL инъекцию
    await page.fill('input[name="username"]', "' OR '1'='1");
    await page.click('button[type="submit"]');

    const bugOverlay = await mainPage.checkForBugOverlay();
    expect(bugOverlay.found).toBe(true);
  });

  test('Buffer overflow simulation', async ({ page }) => {
    // Тест на переполнение буфера
    const longString = 'A'.repeat(10000);
    await page.fill('textarea', longString);
    await page.click('button[type="submit"]');

    const bugOverlay = await mainPage.checkForBugOverlay();
    expect(bugOverlay.found).toBe(true);
  });

  test('Race condition bug', async ({ page }) => {
    // Тест на состояние гонки
    await Promise.all([
      page.click('button#submit1'),
      page.click('button#submit2'),
      page.click('button#submit3'),
    ]);

    const bugOverlay = await mainPage.checkForBugOverlay();
    expect(bugOverlay.found).toBe(true);
  });

  test('Memory leak detection', async ({ page }) => {
    // Тест на утечку памяти
    for (let i = 0; i < 100; i++) {
      await page.click('button#create-object');
    }

    const bugOverlay = await mainPage.checkForBugOverlay();
    expect(bugOverlay.found).toBe(true);
  });
});
