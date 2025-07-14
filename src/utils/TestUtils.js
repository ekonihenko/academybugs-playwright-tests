export class TestUtils {
  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateXSSPayload() {
    return '<script>alert("XSS")</script>';
  }

  static generateSQLPayload() {
    return "' OR '1'='1";
  }

  static generateLongString(length = 10000) {
    return 'A'.repeat(length);
  }

  static async waitForCondition(condition, timeout = 30000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await condition()) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return false;
  }

  static formatBugReport(bugInfo) {
    return {
      timestamp: new Date().toISOString(),
      bugFound: bugInfo.found,
      message: bugInfo.message,
      severity: 'High',
      category: 'UI Bug',
    };
  }
}
