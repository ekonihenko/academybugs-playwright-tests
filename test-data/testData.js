export const testData = {
  validUser: {
    name: 'Test User',
    email: 'test@example.com',
    password: 'TestPassword123',
  },

  invalidUser: {
    name: '',
    email: 'invalid-email',
    password: '123',
  },

  searchQueries: ['bug', 'test', 'error', 'validation'],

  sqlInjectionPayloads: [
    "' OR '1'='1",
    "'; DROP TABLE users; --",
    "' UNION SELECT * FROM users --",
  ],

  xssPayloads: [
    '<script>alert("XSS")</script>',
    '<img src="x" onerror="alert(1)">',
    'javascript:alert("XSS")',
  ],
};
