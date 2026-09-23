/**
 * Keypad Component - 4x5 grid keypad layout.
 */
import { createCalculatorButton } from './CalculatorButton.js';

export function renderKeypad(onKeyClick) {
  const keypad = document.createElement('div');
  keypad.className = 'calculator-keypad';

  const buttonsConfig = [
    { label: 'AC', ariaLabel: 'Clear calculator', variant: 'action' },
    { label: '⌫', ariaLabel: 'Delete last digit', variant: 'action' },
    { label: '%', ariaLabel: 'Percentage', variant: 'action' },
    { label: '÷', ariaLabel: 'Divide', variant: 'op' },
    
    { label: '7', ariaLabel: '7', variant: 'num' },
    { label: '8', ariaLabel: '8', variant: 'num' },
    { label: '9', ariaLabel: '9', variant: 'num' },
    { label: '×', ariaLabel: 'Multiply', variant: 'op' },

    { label: '4', ariaLabel: '4', variant: 'num' },
    { label: '5', ariaLabel: '5', variant: 'num' },
    { label: '6', ariaLabel: '6', variant: 'num' },
    { label: '−', ariaLabel: 'Subtract', variant: 'op' },

    { label: '1', ariaLabel: '1', variant: 'num' },
    { label: '2', ariaLabel: '2', variant: 'num' },
    { label: '3', ariaLabel: '3', variant: 'num' },
    { label: '+', ariaLabel: 'Add', variant: 'op' },

    { label: '±', ariaLabel: 'Positive negative toggle', variant: 'num' },
    { label: '0', ariaLabel: '0', variant: 'num' },
    { label: '.', ariaLabel: 'Decimal point', variant: 'num' },
    { label: '=', ariaLabel: 'Equals', variant: 'equals' }
  ];

  buttonsConfig.forEach(config => {
    const btn = createCalculatorButton({
      ...config,
      onClick: () => onKeyClick && onKeyClick(config.label)
    });
    keypad.appendChild(btn);
  });

  return keypad;
}
