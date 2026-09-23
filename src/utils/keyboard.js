/**
 * Keyboard shortcuts utility for Modern Calculator App.
 * Intercepts physical keyboard inputs and maps to calculator actions.
 */

export function setupKeyboardListeners(calcState) {
  const handleKeyDown = (event) => {
    const { key, activeElement } = event;

    // Ignore keyboard shortcuts when typing in input fields or textareas if any
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
      return;
    }

    let actionKey = null;

    if (key >= '0' && key <= '9') {
      actionKey = key;
    } else if (key === '.') {
      actionKey = '.';
    } else if (key === '+') {
      actionKey = '+';
    } else if (key === '-') {
      actionKey = '-';
    } else if (key === '*') {
      actionKey = '×';
    } else if (key === '/') {
      event.preventDefault(); // Prevent Firefox quick-find
      actionKey = '÷';
    } else if (key === '%') {
      actionKey = '%';
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      actionKey = '=';
    } else if (key === 'Backspace') {
      event.preventDefault();
      actionKey = '⌫';
    } else if (key === 'Escape') {
      event.preventDefault();
      actionKey = 'AC';
    }

    if (actionKey && calcState) {
      calcState.handleKeyPress(actionKey);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}
