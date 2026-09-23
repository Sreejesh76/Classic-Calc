/**
 * Comprehensive Unit Tests for Phase 2 Calculation Engine & Edge Cases.
 */
import { describe, expect } from './testRunner.js';
import { 
  calculate, 
  toggleSign, 
  applyPercentage, 
  canAppendDecimal, 
  appendOrReplaceOperator,
  evaluateSafe 
} from '../logic/calculator.js';
import { evaluateExpression } from '../logic/parser.js';
import { formatNumber } from '../logic/formatter.js';

describe('1. Basic Arithmetic Operations', (it) => {
  it('Addition: 2 + 3 = 5', () => {
    expect(calculate(2, 3, '+')).toBe(5);
  });

  it('Subtraction: 10 - 4 = 6', () => {
    expect(calculate(10, 4, '-')).toBe(6);
    expect(calculate(10, 4, '−')).toBe(6);
  });

  it('Multiplication: 6 * 7 = 42', () => {
    expect(calculate(6, 7, '*')).toBe(42);
    expect(calculate(6, 7, '×')).toBe(42);
  });

  it('Division: 20 / 5 = 4', () => {
    expect(calculate(20, 5, '/')).toBe(4);
    expect(calculate(20, 5, '÷')).toBe(4);
  });
});

describe('2. Operator Precedence & Associativity', (it) => {
  it('Operator Precedence: 2 + 3 × 4 = 14', () => {
    expect(evaluateExpression('2 + 3 * 4')).toBe(14);
    expect(evaluateExpression('2 + 3 × 4')).toBe(14);
  });

  it('Left Associativity: 20 ÷ 5 × 2 = 8', () => {
    expect(evaluateExpression('20 / 5 * 2')).toBe(8);
    expect(evaluateExpression('20 ÷ 5 × 2')).toBe(8);
  });
});

describe('3. Floating Point Precision & Formatting', (it) => {
  it('Fixes JS floating point artifacts: 0.1 + 0.2 = 0.3', () => {
    const rawSum = 0.1 + 0.2;
    expect(formatNumber(rawSum)).toBe('0.3');
  });

  it('Formats scientific notation for numbers >= 1e12', () => {
    expect(formatNumber(10000000000000)).toBe('1e+13');
  });
});

describe('4. Percentage & Sign Toggle Logic', (it) => {
  it('Standalone percentage: 50% = 0.5', () => {
    expect(applyPercentage('50')).toBe('0.5');
  });

  it('Expression percentage context: 100 + 10% = 10', () => {
    expect(applyPercentage('10', '100', '+')).toBe('10');
  });

  it('Toggle sign: 25 -> -25 -> 25', () => {
    expect(toggleSign('25')).toBe('-25');
    expect(toggleSign('-25')).toBe('25');
    expect(toggleSign('0')).toBe('0');
  });
});

describe('5. Error Handling & Edge Cases', (it) => {
  it('Handles division by zero gracefully', () => {
    const evalResult = evaluateSafe('10 / 0');
    expect(evalResult.success).toBe(false);
    expect(evalResult.formattedResult).toBe('Cannot divide by zero');
  });

  it('Prevents multiple decimal points in single number', () => {
    expect(canAppendDecimal('5.5')).toBe(false);
    expect(canAppendDecimal('5')).toBe(true);
  });

  it('Replaces sequential operators properly: 10 + replaced by × -> 10 ×', () => {
    expect(appendOrReplaceOperator('10 +', '×')).toBe('10 *');
  });
});
