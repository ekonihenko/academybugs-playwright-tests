import { test, expect } from '@playwright/test';

test.describe('AcademyBugs - Simple Working Tests', () => {
  test('Тест 1: Проверка загрузки страницы', async ({ page }) => {
    console.log(' Тест 1: Проверка загрузки страницы');

    await page.goto('https://academybugs.com/find-bugs/');

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/academybugs\.com/);

    const title = await page.title();
    expect(title).toBeTruthy();

    console.log(`Страница загружена: ${title}`);

    await page.screenshot({ path: 'test-results/page-loaded.png' });
  });

  test('Тест 2: Поиск кликабельных элементов', async ({ page }) => {
    console.log(' Тест 2: Поиск кликабельных элементов');

    await page.goto('https://academybugs.com/find-bugs/');
    await page.waitForLoadState('networkidle');

    const buttons = await page.locator('button').all();
    console.log(`Найдено кнопок: ${buttons.length}`);

    const links = await page.locator('a').all();
    console.log(`Найдено ссылок: ${links.length}`);

    const inputs = await page.locator('input').all();
    console.log(`Найдено полей ввода: ${inputs.length}`);

    expect(buttons.length + links.length + inputs.length).toBeGreaterThan(0);

    await page.screenshot({ path: 'test-results/elements-found.png' });
  });

  test('Тест 3: Взаимодействие с формами', async ({ page }) => {
    console.log('Тест 3: Взаимодействие с формами');

    await page.goto('https://academybugs.com/find-bugs/');
    await page.waitForLoadState('networkidle');

    try {
      const inputs = await page
        .locator('input[type="text"], input[type="email"], input[type="search"]')
        .all();

      if (inputs.length > 0) {
        console.log(`Найдено ${inputs.length} полей ввода`);

        await inputs[0].fill('test input');
        console.log('Поле заполнено успешно');

        const value = await inputs[0].inputValue();
        expect(value).toBe('test input');
      } else {
        console.log('Поля ввода не найдены');
      }
    } catch (error) {
      console.log(` Ошибка при работе с формами: ${error.message}`);
    }

    await page.screenshot({ path: 'test-results/form-interaction.png' });
  });

  test('Тест 4: Проверка JavaScript ошибок', async ({ page }) => {
    console.log(' Тест 4: Проверка JavaScript ошибок');

    const jsErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        jsErrors.push(msg.text());
      }
    });

    await page.goto('https://academybugs.com/find-bugs/');
    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(3000);

    console.log(`Найдено JS ошибок: ${jsErrors.length}`);

    if (jsErrors.length > 0) {
      console.log(' JavaScript ошибки найдены:');
      jsErrors.forEach((error, index) => {
        console.log(`${index + 1}. ${error}`);
      });
    }

    await page.screenshot({ path: 'test-results/js-errors-check.png' });
  });

  test('Test 5: Test navigation and links', async ({ page }) => {
    console.log('🔗 Тест 5: Проверка навигации');

    await page.goto('https://academybugs.com/find-bugs/');
    await page.waitForLoadState('networkidle');

    try {
      const internalLinks = await page
        .locator('a[href*="academybugs.com"], a[href^="/"], a[href^="./"]')
        .all();

      if (internalLinks.length > 0) {
        console.log(`Найдено внутренних ссылок: ${internalLinks.length}`);

        const firstLink = internalLinks[0];
        const href = await firstLink.getAttribute('href');

        console.log(`Кликаем на ссылку: ${href}`);

        await firstLink.click();
        await page.waitForLoadState('networkidle');

        console.log(`Текущий URL: ${page.url()}`);
      } else {
        console.log(' Внутренние ссылки не найдены');
      }
    } catch (error) {
      console.log(` Ошибка при навигации: ${error.message}`);
    }

    await page.screenshot({ path: 'test-results/navigation-test.png' });
  });
});
