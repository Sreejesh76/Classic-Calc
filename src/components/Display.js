/**
 * Display Component - Renders active expression and main result value.
 */

export function renderDisplay(expression = '', value = '0', error = null) {
  const display = document.createElement('div');
  display.className = 'calculator-display';

  const exprDiv = document.createElement('div');
  exprDiv.className = 'display-expression';
  exprDiv.setAttribute('aria-label', 'Current expression');
  exprDiv.textContent = expression || '\u00A0';

  const valDiv = document.createElement('div');
  valDiv.className = `display-value ${error ? 'error' : ''}`;
  valDiv.setAttribute('aria-live', 'polite');
  valDiv.setAttribute('aria-label', 'Current calculator value');
  valDiv.textContent = value;

  // Auto font size adjustment for long values
  if (value.length > 10 && !error) {
    valDiv.style.fontSize = '1.8rem';
  } else if (value.length > 7 && !error) {
    valDiv.style.fontSize = '2.2rem';
  } else if (!error) {
    valDiv.style.fontSize = '2.75rem';
  }

  display.appendChild(exprDiv);
  display.appendChild(valDiv);

  return display;
}

export function updateDisplay(displayElem, expression, value, error) {
  if (!displayElem) return;
  const exprDiv = displayElem.querySelector('.display-expression');
  const valDiv = displayElem.querySelector('.display-value');

  if (exprDiv) exprDiv.textContent = expression || '\u00A0';
  if (valDiv) {
    valDiv.textContent = value;
    if (error) {
      valDiv.classList.add('error');
      valDiv.style.fontSize = '1.5rem';
    } else {
      valDiv.classList.remove('error');
      if (value.length > 10) {
        valDiv.style.fontSize = '1.8rem';
      } else if (value.length > 7) {
        valDiv.style.fontSize = '2.2rem';
      } else {
        valDiv.style.fontSize = '2.75rem';
      }
    }
  }
}
