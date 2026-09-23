/**
 * CalculatorButton Component - Accessible, styled button component for numeric & operator input.
 */

export function createCalculatorButton({ label, ariaLabel, variant = 'num', onClick }) {
  const btn = document.createElement('button');
  btn.className = `calc-btn btn-${variant}`;
  btn.setAttribute('aria-label', ariaLabel || label);
  btn.innerText = label;
  
  if (onClick) {
    btn.addEventListener('click', onClick);
  }
  
  return btn;
}
