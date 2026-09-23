/**
 * Application Entry Point - Mounts Calculator component into DOM.
 */
import { renderCalculatorApp } from './components/Calculator.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('app');
  if (root) {
    root.appendChild(renderCalculatorApp());
  }
});
