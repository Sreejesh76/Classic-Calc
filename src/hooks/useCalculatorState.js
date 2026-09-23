/**
 * Calculator State Management & Transitions Engine.
 * Supports persistent local storage history, expression building, chaining, error handling, and state recovery.
 */
import { 
  evaluateSafe, 
  canAppendDecimal, 
  toggleSign as toggleValueSign, 
  applyPercentage, 
  appendOrReplaceOperator 
} from '../logic/calculator.js';

const HISTORY_STORAGE_KEY = 'antigravity_calculator_history_v1';
const MAX_HISTORY_ITEMS = 100;

export function loadHistoryFromStorage() {
  try {
    const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.warn('Failed to read calculation history from storage:', err);
    return [];
  }
}

export function saveHistoryToStorage(historyItems) {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyItems.slice(0, MAX_HISTORY_ITEMS)));
  } catch (err) {
    console.warn('Failed to save calculation history to storage:', err);
  }
}

export class CalculatorState {
  constructor(onChangeCallback) {
    this.currentValue = '0';
    this.expression = '';
    this.previousValue = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.error = null;
    this.history = loadHistoryFromStorage();
    this.onChangeCallback = onChangeCallback;
  }

  notify() {
    if (this.onChangeCallback) {
      this.onChangeCallback(this.getState());
    }
  }

  getState() {
    return {
      currentValue: this.currentValue,
      expression: this.expression,
      previousValue: this.previousValue,
      operator: this.operator,
      waitingForOperand: this.waitingForOperand,
      error: this.error,
      history: this.history
    };
  }

  inputDigit(digit) {
    if (this.error) {
      this.clearAll();
    }

    if (this.waitingForOperand) {
      this.currentValue = digit;
      this.waitingForOperand = false;
    } else {
      if (this.currentValue === '0') {
        this.currentValue = digit;
      } else {
        if (this.currentValue.length < 15) {
          this.currentValue += digit;
        }
      }
    }
    this.notify();
  }

  inputDecimal() {
    if (this.error) {
      this.clearAll();
    }

    if (this.waitingForOperand) {
      this.currentValue = '0.';
      this.waitingForOperand = false;
    } else if (canAppendDecimal(this.currentValue)) {
      this.currentValue += '.';
    }
    this.notify();
  }

  performOperation(nextOperator) {
    if (this.error) return;

    if (this.operator && this.waitingForOperand) {
      // Replace last operator if user presses operator sequentially
      this.operator = nextOperator;
      this.expression = appendOrReplaceOperator(this.expression, nextOperator);
      this.notify();
      return;
    }

    if (this.previousValue === null) {
      this.previousValue = this.currentValue;
      this.expression = `${this.currentValue} ${nextOperator}`;
    } else if (this.operator) {
      // Evaluate chained expression
      const evalResult = evaluateSafe(`${this.expression} ${this.currentValue}`);
      if (evalResult.success) {
        this.currentValue = evalResult.formattedResult;
        this.previousValue = evalResult.formattedResult;
        this.expression = `${evalResult.formattedResult} ${nextOperator}`;
      } else {
        this.error = evalResult.formattedResult;
        this.currentValue = evalResult.formattedResult;
        this.notify();
        return;
      }
    } else {
      this.expression = `${this.currentValue} ${nextOperator}`;
      this.previousValue = this.currentValue;
    }

    this.operator = nextOperator;
    this.waitingForOperand = true;
    this.notify();
  }

  toggleSign() {
    if (this.error) return;
    this.currentValue = toggleValueSign(this.currentValue);
    this.notify();
  }

  inputPercent() {
    if (this.error) return;
    this.currentValue = applyPercentage(this.currentValue, this.previousValue, this.operator);
    this.notify();
  }

  deleteLast() {
    if (this.error) {
      this.clearAll();
      return;
    }

    if (this.waitingForOperand) return;

    if (this.currentValue.length > 1) {
      this.currentValue = this.currentValue.slice(0, -1);
      if (this.currentValue === '-' || this.currentValue === '') {
        this.currentValue = '0';
      }
    } else {
      this.currentValue = '0';
    }
    this.notify();
  }

  clearAll() {
    this.currentValue = '0';
    this.expression = '';
    this.previousValue = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.error = null;
    this.notify();
  }

  evaluate() {
    if (this.error || !this.expression) return;

    const fullExpr = `${this.expression} ${this.currentValue}`;
    const evalResult = evaluateSafe(fullExpr);

    if (evalResult.success) {
      const formattedResult = evalResult.formattedResult;

      // Add to calculation history
      const historyEntry = {
        id: Date.now().toString(),
        expression: fullExpr,
        result: formattedResult,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      this.history = [historyEntry, ...this.history];
      saveHistoryToStorage(this.history);

      this.currentValue = formattedResult;
      this.expression = '';
      this.previousValue = null;
      this.operator = null;
      this.waitingForOperand = true;
    } else {
      this.error = evalResult.formattedResult;
      this.currentValue = evalResult.formattedResult;
    }

    this.notify();
  }

  clearHistory() {
    this.history = [];
    saveHistoryToStorage(this.history);
    this.notify();
  }

  selectHistoryItem(item) {
    if (item && item.result) {
      this.currentValue = item.result;
      this.waitingForOperand = false;
      this.notify();
    }
  }

  handleKeyPress(key) {
    switch (key) {
      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
        this.inputDigit(key);
        break;
      case '.':
        this.inputDecimal();
        break;
      case '+': case '−': case '-': case '×': case '*': case '÷': case '/':
        this.performOperation(key);
        break;
      case '±':
        this.toggleSign();
        break;
      case '%':
        this.inputPercent();
        break;
      case '⌫': case 'Backspace':
        this.deleteLast();
        break;
      case 'AC': case 'Escape':
        this.clearAll();
        break;
      case '=': case 'Enter':
        this.evaluate();
        break;
    }
  }
}
