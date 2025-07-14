export class AcademyBugsPage {
  constructor(page) {
    this.page = page;

    this.selectors = {
      homeLink: 'a[href="/"]',
      findBugsLink: 'a[href*="find-bugs"]',

      searchInput: 'input[type="search"], input[name="search"], #search',
      emailInput: 'input[type="email"], input[name="email"]',
      nameInput: 'input[type="text"], input[name="name"]',
      submitButton: 'button[type="submit"], input[type="submit"]',

      primaryButton: '.btn-primary, button.primary',
      secondaryButton: '.btn-secondary, button.secondary',

      errorMessage: '.error, .alert-danger, [class*="error"]',
      successMessage: '.success, .alert-success, [class*="success"]',
      loadingSpinner: '.loading, .spinner, [class*="loading"]',

      brokenImage: 'img[src=""], img[alt*="broken"]',
      brokenLink: 'a[href=""], a[href="#"]',
      hiddenElement: '[style*="display: none"], .hidden',
    };
  }

  async goto() {
    console.log(' Переходим на AcademyBugs');
    await this.page.goto('https://academybugs.com/find-bugs/');
    await this.page.waitForLoadState('networkidle');
  }

  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true,
    });
  }

  async waitForElement(selector, timeout = 5000) {
    try {
      await this.page.waitForSelector(selector, { timeout });
      return true;
    } catch {
      return false;
    }
  }

  async findAnyElement(selectors) {
    for (const selector of selectors) {
      const element = await this.page.locator(selector).first();
      if ((await element.count()) > 0) {
        return element;
      }
    }
    return null;
  }

  async fillForm(data) {
    console.log(' Заполняем форму');

    const nameField = await this.findAnyElement([
      'input[name="name"]',
      'input[placeholder*="name"]',
      'input[type="text"]',
    ]);

    const emailField = await this.findAnyElement([
      'input[name="email"]',
      'input[type="email"]',
      'input[placeholder*="email"]',
    ]);

    if (nameField && data.name) {
      await nameField.fill(data.name);
      console.log(` Имя заполнено: ${data.name}`);
    }

    if (emailField && data.email) {
      await emailField.fill(data.email);
      console.log(` Email заполнен: ${data.email}`);
    }
  }

  async submitForm() {
    console.log(' Отправляем форму');

    const submitBtn = await this.findAnyElement([
      'button[type="submit"]',
      'input[type="submit"]',
      '.btn-submit',
      'button:has-text("Submit")',
    ]);

    if (submitBtn) {
      await submitBtn.click();
      console.log(' Форма отправлена');
      return true;
    }

    console.log(' Кнопка отправки не найдена');
    return false;
  }

  async searchFor(query) {
    console.log(` Поиск: ${query}`);

    const searchField = await this.findAnyElement([
      'input[type="search"]',
      'input[name="search"]',
      'input[placeholder*="search"]',
    ]);

    if (searchField) {
      await searchField.fill(query);
      await searchField.press('Enter');
      console.log(` Поиск выполнен: ${query}`);
      return true;
    }

    console.log(' Поле поиска не найдено');
    return false;
  }

  async checkForJSErrors() {
    const errors = [];

    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    this.page.on('pageerror', (error) => {
      errors.push(error.message);
    });

    return errors;
  }

  async detectBugs() {
    console.log(' Ищем баги на странице');
    const bugs = [];

    const images = await this.page.locator('img').all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (!src || src === '' || src === '#') {
        bugs.push('Broken image detected');
      }
    }

    const links = await this.page.locator('a').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (!href || href === '' || href === '#') {
        bugs.push('Broken link detected');
      }
    }

    const buttons = await this.page.locator('button').all();
    for (const button of buttons) {
      const text = await button.textContent();
      if (!text || text.trim() === '') {
        bugs.push('Button without text detected');
      }
    }

    console.log(` Найдено багов: ${bugs.length}`);
    return bugs;
  }
}
