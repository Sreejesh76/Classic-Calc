/**
 * Core arithmetic calculator logic and edge-case handling.
 */
import { evaluateExpression, normalizeOperator } from './parser.js';
import { formatNumber } from './formatter.js';

export function calculate(a, b, op) {
  const numA = typeof a === 'number' ? a : parseFloat(a);
  const numB = typeof b === 'number' ? b : parseFloat(b);
  const normOp = normalizeOperator(op);

  if (isNaN(numA) || isNaN(numB)) {
    throw new Error("Invalid number input");
  }

  switch (normOp) {
    case '+':
      return numA + numB;
    case '-':
      return numA - numB;
    case '*':
      return numA * numB;
    case '/':
      if (numB === 0) {
        throw new Error("Cannot divide by zero");
      }
      return numA / numB;
    default:
      return numB;
  }
}

/**
 * Toggle positive / negative sign of a numeric string or number.
 * Examples: '25' -> '-25', '-25' -> '25', '0' -> '0'
 */
export function toggleSign(valueStr) {
  if (!valueStr || valueStr === '0') return '0';
  if (valueStr === 'Cannot divide by zero' || valueStr === 'Error') return valueStr;
  
  if (valueStr.startsWith('-')) {
    return valueStr.slice(1);
  } else {
    return '-' + valueStr;
  }
}

/**
 * Handle percentage logic.
 * Standalone: 50 -> 0.5
 * In expression context: 100 + 10% -> 100 + (100 * 0.10) = 110
 */
export function applyPercentage(currentValStr, baseValueStr = null, operator = null) {
  const currentNum = parseFloat(currentValStr);
  if (isNaN(currentNum)) return '0';

  if (baseValueStr !== null && operator !== null && (operator === '+' || operator === '-' || operator === '−')) {
    const baseNum = parseFloat(baseValueStr);
    if (!isNaN(baseNum)) {
      return ((baseNum * currentNum) / 100).toString();
    }
  }

  return (currentNum / 100).toString();
}

/**
 * Validates whether a decimal point '.' can be appended to the current number string.
 * Prevents multiple decimals e.g. 5.2.3
 */
export function canAppendDecimal(currentValueStr) {
  if (!currentValueStr) return true;
  return !currentValueStr.includes('.');
}

/**
 * Handles operator replacement logic.
 * Example: '10 +' followed by '×' replaces '+' with '×' -> '10 ×'
 */
export function appendOrReplaceOperator(expressionStr, newOperator) {
  const normNewOp = normalizeOperator(newOperator);
  if (!expressionStr || expressionStr.trim() === '') return '';

  const trimmed = expressionStr.trim();
  const lastChar = trimmed.slice(-1);
  
  if (['+', '-', '*', '/', '−', '×', '÷'].includes(lastChar)) {
    return trimmed.slice(0, -1) + ' ' + normNewOp;
  }

  return trimmed + ' ' + normNewOp;
}

/**
 * Evaluates expression string safely using parser and formats output.
 */
export function evaluateSafe(expressionStr) {
  try {
    const rawResult = evaluateExpression(expressionStr);
    return {
      success: true,
      result: rawResult,
      formattedResult: formatNumber(rawResult),
      error: null
    };
  } catch (err) {
    return {
      success: false,
      result: null,
      formattedResult: err.message === 'Cannot divide by zero' ? 'Cannot divide by zero' : 'Error',
      error: err.message
    };
  }
}
