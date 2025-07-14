export const TestData = {
  // Данные для тестирования XSS
  xssPayloads: [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert("XSS")>',
    'javascript:alert("XSS")',
    '<svg onload=alert("XSS")>',
    '"><script>alert("XSS")</script>',
  ],

  // Данные для тестирования SQL инъекций
  sqlPayloads: [
    "' OR '1'='1",
    "'; DROP TABLE users; --",
    "' UNION SELECT * FROM users --",
    "admin'--",
    "' OR 1=1 --",
  ],

  // Данные для тестирования переполнения буфера
  bufferOverflowData: {
    shortString: 'A'.repeat(100),
    mediumString: 'A'.repeat(1000),
    longString: 'A'.repeat(10000),
    extremeString: 'A'.repeat(100000),
  },

  // Специальные символы
  specialCharacters: [
    '!@#$%^&*()',
    '{}[]|\\:";\'<>?,./~`',
    'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя',
    '中文测试数据',
    '🚀🎯💻🐛✅❌',
  ],

  // Пользовательские данные
  users: {
    valid: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
    },
    invalid: {
      username: '',
      email: 'invalid-email',
      password: '123',
    },
  },
};
