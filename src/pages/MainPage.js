import { BasePage } from './BasePage.js';

export class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/find-bugs/';

    // Селекторы элементов
    this.selectors = {
      // Навигация
      homeLink: 'a[href="/"]',
      findBugsLink: 'a[href="/find-bugs/"]',

      // Основные элементы
      pageTitle: 'h1',
      bugCounter: '.bug-counter',

      // Формы
      searchInput: 'input[type="search"]',
      searchButton: 'button[type="submit"]',

      // Кнопки и ссылки
      submitButton: 'button[type="submit"]',
      resetButton: 'button[type="reset"]',

      // Модальные окна и оверлеи
      modal: '.modal',
      overlay: '.overlay',
      errorMessage: '.error-message',

      // Специфичные элементы для багов
      bugTrigger1: '#bug-trigger-1',
      bugTrigger2: '#bug-trigger-2',
      bugTrigger3: '#bug-trigger-3',
      bugTrigger4: '#bug-trigger-4',
      bugTrigger5: '#bug-trigger-5',
    };
  }

  async open() {
    await this.goto(this.url);
    await this.waitForElement(this.selectors.pageTitle);
  }

  async getPageTitle() {
    return await this.getText(this.selectors.pageTitle);
  }

  async searchForBugs(searchTerm) {
    await this.fillField(this.selectors.searchInput, searchTerm);
    await this.clickElement(this.selectors.searchButton);
  }

  // Методы для тестирования конкретных багов
  async triggerBug1() {
    await this.clickElement(this.selectors.bugTrigger1);
    return await this.checkForBugOverlay();
  }

  async triggerBug2() {
    await this.clickElement(this.selectors.bugTrigger2);
    return await this.checkForBugOverlay();
  }

  async triggerBug3() {
    await this.clickElement(this.selectors.bugTrigger3);
    return await this.checkForBugOverlay();
  }

  async triggerBug4() {
    await this.clickElement(this.selectors.bugTrigger4);
    return await this.checkForBugOverlay();
  }

  async triggerBug5() {
    await this.clickElement(this.selectors.bugTrigger5);
    return await this.checkForBugOverlay();
  }
}
