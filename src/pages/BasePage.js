import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.timeout = 30000;
  }

  async goto(url) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
  }

  async clickElement(selector) {
    await this.page.waitForSelector(selector, { timeout: this.timeout });
    await this.page.click(selector);
  }

  async fillField(selector, text) {
    await this.page.waitForSelector(selector, { timeout: this.timeout });
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    await this.page.waitForSelector(selector, { timeout: this.timeout });
    return await this.page.textContent(selector);
  }

  async waitForElement(selector) {
    await this.page.waitForSelector(selector, { timeout: this.timeout });
  }

  async isElementVisible(selector) {
    try {
      await this.page.waitForSelector(selector, { timeout: 5000 });
      return await this.page.isVisible(selector);
    } catch {
      return false;
    }
  }

  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `reports/screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  // Проверка на наличие оверлея с ошибкой
  async checkForBugOverlay() {
    const overlaySelector = '.modal, .overlay, .error-modal, [data-testid="bug-overlay"]';
    const isOverlayVisible = await this.isElementVisible(overlaySelector);

    if (isOverlayVisible) {
      const overlayText = await this.getText(overlaySelector);
      console.log(`🐛 Найден баг! Оверлей: ${overlayText}`);
      await this.takeScreenshot('bug-found');
      return { found: true, message: overlayText };
    }

    return { found: false, message: null };
  }
}
