/**
 * Main Calculator Application Container Component.
 * Assembles Header, Display, Keypad, History, State Hook, and Keyboard listeners.
 */
import { renderHeader } from './Header.js';
import { renderDisplay, updateDisplay } from './Display.js';
import { renderKeypad } from './Keypad.js';
import { renderHistory, updateHistory } from './History.js';
import { CalculatorState } from '../hooks/useCalculatorState.js';
import { setupKeyboardListeners } from '../utils/keyboard.js';

export function renderCalculatorApp() {
  const container = document.createElement('main');
  container.className = 'calculator-container';

  const calculatorCard = document.createElement('div');
  calculatorCard.className = 'calculator-card';

  let displayNode = null;
  let historyNode = null;

  // Initialize state machine
  const state = new CalculatorState((newState) => {
    updateDisplay(displayNode, newState.expression, newState.currentValue, newState.error);
    updateHistory(
      historyNode, 
      newState.history, 
      (item) => state.selectHistoryItem(item), 
      () => state.clearHistory()
    );
  });

  const headerNode = renderHeader(
    (theme) => console.log('Theme changed:', theme),
    () => {
      if (historyNode) {
        historyNode.style.display = historyNode.style.display === 'none' ? 'flex' : 'none';
      }
    }
  );

  displayNode = renderDisplay(state.expression, state.currentValue, state.error);
  
  const keypadNode = renderKeypad((keyLabel) => {
    state.handleKeyPress(keyLabel);
  });

  historyNode = renderHistory(
    state.history, 
    (item) => state.selectHistoryItem(item), 
    () => state.clearHistory()
  );

  calculatorCard.appendChild(headerNode);
  calculatorCard.appendChild(displayNode);
  calculatorCard.appendChild(keypadNode);

  container.appendChild(calculatorCard);
  container.appendChild(historyNode);

  // Attach global physical keyboard listener
  setupKeyboardListeners(state);

  return container;
}
