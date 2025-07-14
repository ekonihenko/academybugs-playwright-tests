import { test, expect } from '@playwright/test';
import { AcademyBugsPage } from '../../page-objects/AcademyBugsPage.js';
import { testData } from '../../test-data/testData.js';

test.describe('AcademyBugs UI Tests', () => {
  let academyPage;

  test.beforeEach(async ({ page }) => {
    academyPage = new AcademyBugsPage(page);
    await academyPage.goto();
  });

  test('Тест 1: Проверка валидации формы', async ({ page }) => {
    console.log('Тест 1: Проверка валидации формы');

    await test.step('Заполняем форму невалидными данными', async () => {
      await academyPage.fillForm(testData.invalidUser);
      await academyPage.takeScreenshot('form-invalid-data');
    });

    await test.step('Отправляем форму', async () => {
      const submitted = await academyPage.submitForm();
      if (submitted) {
        await page.waitForTimeout(2000);
      }
    });

    await test.step('Проверяем наличие ошибок валидации', async () => {
      const errorSelectors = [
        '.error',
        '.alert-danger',
        '[class*="error"]',
        '.invalid-feedback',
        '.field-error',
        '[role="alert"]',
      ];

      let errorFound = false;
      for (const selector of errorSelectors) {
        const errorElements = await page.locator(selector).all();
        if (errorElements.length > 0) {
          errorFound = true;
          console.log(` Найдены ошибки валидации: ${selector}`);
          break;
        }
      }

      await academyPage.takeScreenshot('form-validation-result');

      if (!errorFound) {
        console.log(' БАГ: Валидация формы не работает!');
      }
    });
  });

  test('Bug Test 2: Navigation issue', async ({ page }) => {
    console.log(' Тест 2: Проверка навигации');

    await test.step('Ищем навигационные элементы', async () => {
      const navLinks = await page.locator('nav a, .nav a, .menu a, header a').all();
      console.log(`Найдено навигационных ссылок: ${navLinks.length}`);

      if (navLinks.length === 0) {
        console.log(' БАГ: Навигационные элементы не найдены!');
      }
    });

    await test.step('Тестируем переходы по ссылкам', async () => {
      const links = await page.locator('a[href]:not([href="#"]):not([href=""])').all();

      if (links.length > 0) {
        const firstLink = links[0];
        const href = await firstLink.getAttribute('href');
        console.log(`Кликаем на ссылку: ${href}`);

        try {
          await firstLink.click();
          await page.waitForLoadState('networkidle', { timeout: 10000 });

          const currentUrl = page.url();
          console.log(`Текущий URL: ${currentUrl}`);

          await academyPage.takeScreenshot('navigation-result');
        } catch (error) {
          console.log(` БАГ: Ошибка навигации - ${error.message}`);
        }
      }
    });
  });

  test('Тест 3: Проверка функции поиска', async ({ page }) => {
    console.log(' Тест 3: Проверка функции поиска');

    await test.step('Тестируем поиск', async () => {
      const searchQuery = testData.searchQueries[0];
      const searchWorked = await academyPage.searchFor(searchQuery);

      if (searchWorked) {
        await page.waitForTimeout(3000);
        await academyPage.takeScreenshot('search-results');

        const resultsSelectors = [
          '.search-results',
          '.results',
          '[class*="result"]',
          '.search-result',
          '#results',
        ];

        let resultsFound = false;
        for (const selector of resultsSelectors) {
          const results = await page.locator(selector).all();
          if (results.length > 0) {
            resultsFound = true;
            console.log(` Результаты поиска найдены: ${selector}`);
            break;
          }
        }

        if (!resultsFound) {
          console.log(' БАГ: Результаты поиска не отображаются!');
        }
      } else {
        console.log('БАГ: Функция поиска недоступна!');
      }
    });
  });

  test('Тест 4: Проверка взаимодействия с кнопками', async ({ page }) => {
    console.log('Тест 4: Проверка взаимодействия с кнопками');

    await test.step('Находим все кнопки', async () => {
      const buttons = await page
        .locator('button, input[type="button"], input[type="submit"]')
        .all();
      console.log(`Найдено кнопок: ${buttons.length}`);

      if (buttons.length === 0) {
        console.log(' БАГ: Кнопки не найдены!');
        return;
      }
    });

    await test.step('Тестируем клики по кнопкам', async () => {
      const clickableButtons = await page.locator('button:not([disabled])').all();

      for (let i = 0; i < Math.min(clickableButtons.length, 3); i++) {
        const button = clickableButtons[i];
        const buttonText = await button.textContent();

        console.log(`Кликаем на кнопку: "${buttonText}"`);

        try {
          await button.click();
          await page.waitForTimeout(1000);

          await academyPage.takeScreenshot(`button-click-${i + 1}`);
          console.log(` Кнопка "${buttonText}" работает`);
        } catch (error) {
          console.log(` БАГ: Кнопка "${buttonText}" не работает - ${error.message}`);
        }
      }
    });
  });

  test('Тест 5: Проверка отображения данных', async ({ page }) => {
    console.log('Тест 5: Проверка отображения данных');

    await test.step('Проверяем загрузку контента', async () => {
      await page.waitForTimeout(3000);

      const contentSelectors = [
        'main',
        '.content',
        '#content',
        '.main-content',
        'article',
        '.post',
        '.page-content',
      ];

      let contentFound = false;
      for (const selector of contentSelectors) {
        const content = await page.locator(selector).first();
        if ((await content.count()) > 0) {
          const text = await content.textContent();
          if (text && text.trim().length > 0) {
            contentFound = true;
            console.log(` Контент найден: ${selector}`);
            break;
          }
        }
      }

      if (!contentFound) {
        console.log(' БАГ: Основной контент не отображается!');
      }
    });

    await test.step('Проверяем изображения', async () => {
      const images = await page.locator('img').all();
      console.log(`Найдено изображений: ${images.length}`);

      let brokenImages = 0;
      for (const img of images) {
        const src = await img.getAttribute('src');
        if (!src || src === '' || src === '#') {
          brokenImages++;
        }
      }

      if (brokenImages > 0) {
        console.log(`БАГ: Найдено ${brokenImages} сломанных изображений!`);
      }

      await academyPage.takeScreenshot('data-display-check');
    });
  });
});
