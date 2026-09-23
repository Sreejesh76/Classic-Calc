/**
 * Lightweight ES Module Test Runner & Assertion Library.
 */

export const suites = [];

export function describe(suiteName, fn) {
  const currentSuite = { name: suiteName, tests: [] };
  suites.push(currentSuite);
  
  const it = (testName, testFn) => {
    currentSuite.tests.push({ name: testName, fn: testFn });
  };
  
  fn(it);
}

export const expect = (actual) => ({
  toBe(expected) {
    if (actual !== expected) {
      throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
    }
  },
  toThrow(expectedMessage) {
    let threw = false;
    let actualError = null;
    try {
      actual.();
    } catch (e) {
      threw = true;
      actualError = e.message;
    }
    if (!threw) {
      throw new Error(`Expected function to throw error but it completed successfully`);
    }
    if (expectedMessage && actualError !== expectedMessage) {
      throw new Error(`Expected error message "${expectedMessage}" but got "${actualError}"`);
    }
  }
});

export async function runAllTests() {
  let passed = 0;
  let failed = 0;
  const results = [];

  for (const suite of suites) {
    console.log(`\nSuite: ${suite.name}`);
    for (const test of suite.tests) {
      try {
        await test.fn();
        passed++;
        console.log(`  ✓ ${test.name}`);
        results.push({ suite: suite.name, test: test.name, status: 'pass' });
      } catch (err) {
        failed++;
        console.error(`  ✗ ${test.name}: ${err.message}`);
        results.push({ suite: suite.name, test: test.name, status: 'fail', error: err.message });
      }
    }
  }

  console.log(`\nTest Run Summary: ${passed} passed, ${failed} failed.`);
  return { passed, failed, total: passed + failed, results };
}
