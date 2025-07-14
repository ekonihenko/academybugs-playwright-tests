# AcademyBugs Playwright Test Framework

Автоматизированный тестовый фреймворк для тестирования UI сервиса [AcademyBugs](https://academybugs.com/find-bugs/) с использованием Playwright и JavaScript.

## Особенности

- 5 UI-тестов для выявления дефектов
- Паттерн Page Object Model
- Интеграция с Allure Reports
- CI/CD с GitHub Actions
- Allure Notifications
- Поддержка множественных браузеров

## Требования

- Node.js 18+
- npm или yarn
- Git

## Установка

```bash
# Клонируй репозиторий
git clone https://github.com/your-username/academybugs-playwright-tests.git
cd academybugs-playwright-tests

# Установи зависимости
npm install

# Установи браузеры Playwright
npx playwright install
```

# Запуск всех тестов

npm test

# Запуск в headed режиме

npm run test:headed

# Запуск с UI режимом

npm run test:ui

# Запуск в конкретном браузере

npm run test:chromium

# Генерация Allure отчета

npm run allure:generate

# Открытие Allure отчета

npm run allure:open

# Просмотр HTML отчета Playwright

npm run report

Структура проекта

academybugs-playwright-tests/
├── src/
│ ├── pages/ # Page Object классы
│ ├── utils/ # Утилиты
│ └── data/ # Тестовые данные
├── tests/
│ └── ui/ # UI тесты
├── config/ # Конфигурационные файлы
├── .github/
│ └── workflows/ # GitHub Actions
└── reports/ # Отчеты тестирования

Найденные баги

XSS уязвимость - Возможность внедрения JavaScript кода
SQL инъекция - Уязвимость в обработке пользовательского ввода
Переполнение буфера - Некорректная обработка длинных строк
Состояние гонки - Проблемы с параллельными запросами
Утечка памяти - Неправильное управление ресурсами

CI/CD

Проект настроен для автоматического запуска тестов при каждом push и pull request. Результаты публикуются на GitHub Pages.

Уведомления

Настроены уведомления в Telegram и Slack о результатах тестирования.

Автор

Екатерина Онищенко
