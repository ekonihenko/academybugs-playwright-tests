import { test, expect } from '@playwright/test';
import { AcademyBugsPage } from '../../page-objects/AcademyBugsPage.js';
import { testData } from '../../test-data/testData.js';

test.describe('Specific Bug Detection Tests', () => {
  let academyPage;

  test.beforeEach(async ({ page }) => {
    academyPage = new AcademyBugsPage(page);
    await academyPage.goto();
  });

  test('Race condition bug', async ({ page }) => {
    console.log(' Тест: Быстрые клики');

    await test.step('Быстрые множественные клики', async () => {
      const buttons = await page.locator('button:not([disabled])').all();

      if (buttons.length > 0) {
        const button = buttons[0];
        console.log(` Найдена кнопка для тестирования`);

        try {
          // Быстро кликаем
          console.log(' Выполняем быстрые клики...');
          for (let i = 0; i < 10; i++) {
            await button.click({ timeout: 100 });
          }

          await page.waitForTimeout(2000);

          const errors = await page.locator('.error, [class*="error"]').all();
          if (errors.length > 0) {
            console.log(' БАГ: Race condition обнаружен!');
            console.log(` Количество ошибок: ${errors.length}`);

            for (let i = 0; i < errors.length; i++) {
              const errorText = await errors[i].textContent();
              console.log(`  Ошибка ${i + 1}: ${errorText}`);
            }
          } else {
            console.log(' Race condition не обнаружен');
          }
        } catch (error) {
          console.log(` Race condition тест: ${error.message}`);
        }
      } else {
        console.log(' Кнопки для тестирования не найдены');
      }

      await academyPage.takeScreenshot('race-condition-test');
    });
  });
});
