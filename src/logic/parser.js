/**
 * Safe expression parser & evaluator for Modern Calculator App using Dijkstra's Shunting-yard algorithm.
 * Security: NO dynamic string evaluation used.
 */

// Normalize operators to standard representations
export function normalizeOperator(op) {
  if (op === '−' || op === '-') return '-';
  if (op === '×' || op === '*') return '*';
  if (op === '÷' || op === '/') return '/';
  return op;
}

// Tokenize an expression string (e.g. "10 + 5 × 2") into token array
export function tokenize(expr) {
  if (!expr || typeof expr !== 'string') return [];
  
  const regex = /(\d+(?:\.\d+)?(?:e[+-]?\d+)?)|([+\-−×*÷/()%])|(\s+)/gi;
  const tokens = [];
  let match;

  while ((match = regex.exec(expr)) !== null) {
    const [full, num, op, space] = match;
    if (space) continue;
    if (num !== undefined) {
      tokens.push({ type: 'number', value: parseFloat(num) });
    } else if (op !== undefined) {
      tokens.push({ type: 'operator', value: normalizeOperator(op) });
    }
  }

  return tokens;
}

const PRECEDENCE = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2
};

// Shunting-Yard: Infix to Postfix (RPN)
export function infixToPostfix(tokens) {
  const outputQueue = [];
  const operatorStack = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.type === 'number') {
      outputQueue.push(token);
    } else if (token.type === 'operator') {
      const op1 = token.value;

      while (operatorStack.length > 0) {
        const top = operatorStack[operatorStack.length - 1];
        if (top.type === 'operator' && PRECEDENCE[top.value] >= PRECEDENCE[op1]) {
          outputQueue.push(operatorStack.pop());
        } else {
          break;
        }
      }
      operatorStack.push(token);
    }
  }

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  return outputQueue;
}

// RPN Evaluator
export function evaluateRPN(rpnTokens) {
  const stack = [];

  for (const token of rpnTokens) {
    if (token.type === 'number') {
      stack.push(token.value);
    } else if (token.type === 'operator') {
      if (stack.length < 2) {
        throw new Error("Invalid expression format");
      }
      const b = stack.pop();
      const a = stack.pop();

      let result;
      switch (token.value) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          if (b === 0) {
            throw new Error("Cannot divide by zero");
          }
          result = a / b;
          break;
        case '%':
          result = a % b;
          break;
        default:
          throw new Error(`Unsupported operator: ${token.value}`);
      }
      stack.push(result);
    }
  }

  if (stack.length !== 1) {
    throw new Error("Invalid expression evaluation");
  }

  return stack[0];
}

// Main safe expression evaluator
export function evaluateExpression(expr) {
  const tokens = tokenize(expr);
  if (tokens.length === 0) return 0;
  const rpn = infixToPostfix(tokens);
  return evaluateRPN(rpn);
}
