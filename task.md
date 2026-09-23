# Task Execution Plan: Modern Calculator App

This document outlines a phase-by-phase execution plan derived from `prd.md` for building the **Modern Calculator App**. Copy and paste each phase sequentially into your coding agent workspace.

---

## Phase 1: Environment Setup & Project Architecture

### Objective
Initialize the web application project structure, build environment, styling foundation, and testing pipeline.

### Tasks
- [x] Initialize project structure in root directory.
- [x] Establish standard modular directory structure:
  ```text
  src/
  ├── components/
  │   ├── Calculator.js
  │   ├── Display.js
  │   ├── Keypad.js
  │   ├── CalculatorButton.js
  │   ├── History.js
  │   └── Header.js
  ├── logic/
  │   ├── calculator.js
  │   ├── parser.js
  │   └── formatter.js
  ├── hooks/
  │   └── useCalculatorState.js
  ├── utils/
  │   └── keyboard.js
  ├── styles/
  │   └── index.css
  └── tests/
      ├── testRunner.js
      └── calculator.test.js
  ```
- [x] Set up testing framework (`testRunner.js` + `test.html`).
- [x] Setup standard CSS reset and root design tokens in `src/styles/index.css`.

### Verification Criteria
- [x] Web server architecture verified (`index.html` + `test.html`).
- [x] Test suite pipeline verified (`run_tests.py`).
- [ ] Test suite executes via `npm test` with zero configuration errors.

---

## Phase 2: Core Calculation Engine & Unit Testing (Pure Logic Layer)

### Objective
Implement safe, accurate, non-`eval()` arithmetic evaluation logic supporting operator precedence, float precision formatting, percentages, and error states.

### Tasks
- [x] **Parser & Evaluator (`src/logic/parser.js`)**:
  - Tokenizer & expression evaluator using Dijkstra's Shunting-yard algorithm.
  - Basic operations: `+`, `−` (`-`), `×` (`*`), `÷` (`/`).
  - Operator precedence (`×`/`÷` before `+`/`−`).
  - Left associativity (`20 ÷ 5 × 2` = `8`).
  - Strict security: No `eval()` or `Function()`.
- [x] **Precision Formatter (`src/logic/formatter.js`)**:
  - Resolves JS float artifacts (`0.1 + 0.2` = `0.3`).
  - Scientific notation for numbers >= `1e12` or < `1e-7`.
  - Number formatting without trailing zero bloat.
- [x] **Special Operations & Edge Cases (`src/logic/calculator.js`)**:
  - Division by zero safety (`"Cannot divide by zero"`).
  - Percentages (`%` standalone & in expression context).
  - Positive/Negative (`±`) toggle.
  - Multiple decimals prevention (`canAppendDecimal`).
  - Sequential operator replacement (`appendOrReplaceOperator`).
- [x] **Unit Tests (`src/tests/calculator.test.js`)**:
  - Unit tests covering basic arithmetic, operator precedence, left associativity, floating point precision, percentage, sign toggle, division by zero, multiple decimals, and operator replacement.

### Verification Criteria
- [x] All unit tests pass cleanly (`test.html` and `run_tests.py`).

---

## Phase 3: Modern UI Component Hierarchy & Design System

### Objective
Build responsive, accessible visual components with curated dark/light color palettes, smooth hover/active animations, and typography hierarchy.

---

## Phase 3: Modern UI Component Hierarchy & Design System

### Objective
Build responsive, accessible visual components with curated dark/light color palettes, smooth hover/active animations, and typography hierarchy.

### Tasks
- [x] **Design Tokens & Theme (`src/styles/index.css`)**:
  - CSS custom properties for dark/light themes, background gradient, glassmorphism surface, button colors.
  - Modern typography ('Outfit' and 'Space Grotesk' Google Fonts).
  - Focus rings and touch feedback micro-animations.
- [x] **Header Component (`src/components/Header.js`)**:
  - App logo/title ("Calculator").
  - Theme Toggle switch (Dark/Light mode) with persistent preference (`localStorage`).
  - Mobile history panel toggle button.
- [x] **Display Component (`src/components/Display.js`)**:
  - Two-row layout: upper row for active expression, lower row for result.
  - Result font size substantially larger than expression with dynamic scaling for long inputs.
  - `aria-live="polite"` live region for screen readers.
- [x] **CalculatorButton Component (`src/components/CalculatorButton.js`)**:
  - Button wrapper with variant styles (`num`, `op`, `action`, `equals`).
  - Hover, active/pressed, focus states, and accessible `aria-label` tags.
- [x] **Keypad Component (`src/components/Keypad.js`)**:
  - 4x5 grid layout corresponding to PRD specification.

### Verification Criteria
- [x] Visual check: UI exhibits modern aesthetic, high contrast, clean typography, visible focus rings, and zero default browser styling artifacts.

---

## Phase 4: State Management & Application Integration

### Objective
Implement the `CalculatorState` state machine to centralize state transitions, connect keypad events, and render active state.

### Tasks
- [x] **State Machine Hook (`src/hooks/useCalculatorState.js`)**:
  - Maintain state fields: `currentValue`, `expression`, `previousValue`, `operator`, `waitingForOperand`, `error`, `history`.
  - Input digit, decimal, perform operation, toggle sign, percent, clear all, delete last, and evaluate.
- [x] **App Integration (`src/components/Calculator.js`)**:
  - Wire keypad actions to state machine.
  - Render expression, current value, error state, and history updates.

### Verification Criteria
- [x] On-screen clicks correctly build expressions, compute accurate results on `=`, handle chained operations, and survive clear/delete actions.

---

## Phase 5: Calculation History & LocalStorage Persistence

### Objective
Implement calculation history logging, side-panel / drawer presentation, item restoration, and persistent local storage.

### Tasks
- [x] **History Logic & Storage (`src/hooks/useCalculatorState.js`)**:
  - Record structure: `{ id, expression, result, timestamp }`.
  - Persist up to 100 entries in `localStorage`.
- [x] **History UI Component (`src/components/History.js`)**:
  - Desktop: Sidebar panel alongside calculator keypad.
  - Mobile: Collapsible drawer triggerable via header button.
  - Render list of previous calculations with newest items first.
  - Provide "Clear History" button.
  - Support clicking/selecting a history item to restore its result into current calculator state.

### Verification Criteria
- [x] Completing a calculation adds an item to history.
- [x] Clicking a history entry restores value into active calculator.
- [x] Page reload preserves history entries.
- [x] Clearing history retains active calculator value.

---

## Phase 6: Physical Keyboard Shortcuts & Full Accessibility (a11y)

### Objective
Map all physical keyboard keybindings to calculator actions and guarantee full screen-reader accessibility.

### Tasks
- [x] **Keyboard Utility (`src/utils/keyboard.ts` / `src/utils/keyboard.js`)**:
  - Attach global `keydown` listener (`0-9`, `+`, `-`, `*`, `/`, `.`, `%`, `Enter`/`=`, `Backspace`, `Escape`).
  - Prevent default browser behaviors for intercepted shortcuts (e.g. `/` quick search in Firefox).
- [x] **Accessibility Audit**:
  - Keyboard tab navigation through keypad buttons and history items.
  - WCAG AA contrast ratio compliance.
  - Screen reader friendly labels (`aria-label`, `role="button"`, `aria-live`).

### Verification Criteria
- [x] Complete calculation workflow using physical keyboard exclusively.
- [x] Zero accessibility violations.

---

## Phase 7: Responsive Design & Mobile Polish

### Objective
Ensure layout behavior across Mobile (320px–390px), Tablet (768px–1024px), and Desktop (1440px+).

### Tasks
- [x] CSS media queries for breakpoints:
  - Mobile (`< 768px`): Center calculator, expand buttons to full touch targets, collapse History to toggleable overlay drawer.
  - Desktop (`>= 768px`): Display History panel side-by-side.
- [x] Prevent horizontal overflow/scrolling under all viewport widths down to 320px.

### Verification Criteria
- [x] Verified layout responsiveness across viewports without scrollbars or broken boundaries.

---

## Phase 8: Final Quality Assurance, Testing & Build Verification

### Objective
Perform end-to-end regression testing, UI polish, console log cleanup, and production build validation.

### Tasks
- [x] Run full unit test suite & verify user flows.
- [x] Edge cases audit (division by zero, large numbers, chaining, decimals).
- [x] Zero console errors or warnings in developer tools.
- [x] Web server verification (`python -m http.server 3000` serving `index.html` & `test.html`).

### Verification Criteria
- [x] Web app verified with 0 errors.
- [x] Calculator application is fully responsive, accessible, feature-complete, and production-ready.

