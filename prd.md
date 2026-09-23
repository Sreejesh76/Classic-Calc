# Product Requirements Document (PRD)
# Modern Calculator App — Antigravity

**Platform:** Antigravity  
**App Type:** Responsive calculator web application  
**Priority:** Production-quality implementation  
**Primary Objective:** Build a polished, responsive, accessible calculator that feels like a modern native calculator rather than a basic HTML demo.

---

## 1. Product Overview

Build a modern calculator application for desktop, tablet, and mobile devices.

The calculator must support:

- Addition `+`
- Subtraction `−`
- Multiplication `×`
- Division `÷`
- Decimal numbers
- Percentage `%`
- Positive/negative toggle `±`
- Clear `AC`
- Delete/backspace `⌫`
- Equals `=`
- Calculation history
- Keyboard input
- Responsive UI
- Error handling
- Accessibility
- Smooth, subtle interactions

The final application must have deliberate visual hierarchy, robust calculation behavior, responsive layouts, and production-quality interaction design.

---

## 2. Problem Statement

Users need a calculator that is:

- Fast to operate
- Visually clear
- Easy to use on touchscreens
- Convenient with a physical keyboard
- Capable of remembering previous calculations
- Reliable with invalid input
- Responsive across different screen sizes

Avoid creating a basic calculator consisting only of HTML buttons and simple arithmetic. The application should have proper state management, calculation logic, accessibility, responsive design, and polished UI behavior.

---

## 3. Goals

### Must-have Goals

1. Perform accurate basic arithmetic.
2. Support operator precedence.
3. Support decimal calculations.
4. Support percentages.
5. Support positive/negative conversion.
6. Support delete and clear operations.
7. Maintain calculation history.
8. Support physical keyboard input.
9. Work on desktop, tablet, and mobile.
10. Prevent and clearly handle invalid calculations.
11. Provide responsive button feedback.
12. Maintain readable output for long numbers and expressions.
13. Deliver a polished modern interface.

### Optional Goals

- Dark/light theme
- Scientific calculator mode
- Memory operations
- History search
- Configurable decimal precision

---

## 4. Target Users

### Primary Users

- Students
- Developers
- Office users
- General desktop users
- Mobile users needing quick calculations

### User Characteristics

The interface should be self-explanatory. Users should not need a tutorial to perform normal calculations.

---

## 5. Core Features

| Feature | Priority |
|---|---|
| Addition | MUST |
| Subtraction | MUST |
| Multiplication | MUST |
| Division | MUST |
| Decimal numbers | MUST |
| Percentage | MUST |
| ± toggle | MUST |
| AC clear | MUST |
| Delete/backspace | MUST |
| Equals | MUST |
| Calculation history | MUST |
| Keyboard support | MUST |
| Responsive UI | MUST |
| Error handling | MUST |
| Accessibility | MUST |
| Dark/light theme | OPTIONAL |
| Scientific mode | OPTIONAL |
| Memory buttons | OPTIONAL |
| History search | OPTIONAL |
| Configurable precision | OPTIONAL |

---

## 6. Functional Requirements

### 6.1 Numeric Input

Provide buttons for:

```text
0 1 2 3 4 5 6 7 8 9
```

Users must be able to enter numbers using both:

- On-screen buttons
- Physical keyboard

---

### 6.2 Arithmetic Operators

Provide:

```text
+
−
×
÷
```

The calculator must support chained expressions.

Example:

```text
10 + 5 × 2
```

Result:

```text
20
```

because multiplication has precedence over addition.

---

### 6.3 Decimal Input

The decimal button inserts `.`.

Valid examples:

```text
5.5
0.25
123.456
```

Prevent multiple decimal points within the same number.

Invalid:

```text
5.2.3
```

---

### 6.4 Percentage

The `%` button must provide intuitive and consistent percentage behavior.

For standalone input:

```text
50 %
```

Result:

```text
0.5
```

For expressions such as:

```text
100 + 10%
```

implement a consistent calculator-style percentage model and document the behavior in the calculation logic.

---

### 6.5 Positive/Negative Toggle

The `±` button toggles the current number.

Example:

```text
25 → -25
-25 → 25
```

It must work with decimal values.

---

### 6.6 Clear

`AC` resets the active calculator state to its initial state.

Example:

```text
25 + 10
```

After `AC`:

```text
0
```

History must NOT be deleted by `AC`.

---

### 6.7 Delete

The delete button removes the last entered digit or character.

Example:

```text
12345
```

After `⌫`:

```text
1234
```

If only one digit remains, deleting it should return the display to:

```text
0
```

Delete must never crash or create an invalid state.

---

### 6.8 Equals

`=` evaluates the current expression.

Example:

```text
25 + 15
```

Result:

```text
40
```

After calculation, the result must be available for continued calculations.

Example:

```text
25 + 15 = × 2 =
```

Result:

```text
80
```

---

## 7. Calculation History

The application must maintain a history of completed calculations.

Example:

```text
Calculation History

25 + 15
= 40

100 ÷ 4
= 25

12 × 8
= 96
```

### Requirements

- Add a history entry after every successful evaluation.
- Display newest calculations first.
- Store expression and result separately.
- Display a timestamp when appropriate.
- Allow selecting a previous calculation.
- Selecting a history item should restore/reuse its result or expression in a deterministic way.
- Provide `Clear History`.
- Clearing history must not reset the active calculator.
- Prefer local browser persistence so history survives page reloads.

---

## 8. User Stories

### Basic Calculation

As a user, I want to add two numbers so that I can quickly calculate their total.

### Decimal Calculation

As a user, I want to enter decimal values so that I can perform precise calculations.

### Editing

As a user, I want to delete the last digit so that I can correct an input mistake.

### History

As a user, I want to see previous calculations so that I can review my work.

### Keyboard

As a desktop user, I want to use my physical keyboard so that I can calculate without clicking every button.

### Mobile

As a mobile user, I want large touch-friendly buttons so that I can operate the calculator easily.

### Error Handling

As a user, I want invalid calculations to produce understandable feedback instead of breaking the application.

---

## 9. User Flow

### Standard Calculation

```text
Launch App
    ↓
Calculator displayed
    ↓
Enter number
    ↓
Select operator
    ↓
Enter second number
    ↓
Select operator or Equals
    ↓
Calculate expression
    ↓
Display result
    ↓
Save to history
```

### Edit Calculation

```text
Launch
 ↓
Enter expression
 ↓
Delete/Edit
 ↓
Calculate
 ↓
Result
 ↓
Continue calculation
```

### History

```text
Open History
 ↓
View calculations
 ↓
Select calculation
 ↓
Restore/reuse calculation
```

---

## 10. Screen/UI Requirements

### Header

Display a clean header such as:

```text
Calculator
```

Optional:

```text
☼ / ☾
```

for theme switching.

### Display

The display must contain:

1. Expression/current operation
2. Current result/value

Example:

```text
125 × 4
500
```

The result must be substantially larger than the expression.

### Keypad

Recommended layout:

```text
┌─────┬─────┬─────┬─────┐
│ AC  │  ⌫  │  %  │  ÷  │
├─────┼─────┼─────┼─────┤
│  7  │  8  │  9  │  ×  │
├─────┼─────┼─────┼─────┤
│  4  │  5  │  6  │  −  │
├─────┼─────┼─────┼─────┤
│  1  │  2  │  3  │  +  │
├─────┼─────┼─────┼─────┤
│  ±  │  0  │  .  │  =  │
└─────┴─────┴─────┴─────┘
```

The `0` button may span two columns if this improves the design.

### History

On desktop, display history as a side panel when screen width permits.

On mobile, use a:

- Drawer
- Modal
- Bottom sheet
- Collapsible panel

Do not allow history to make the main calculator difficult to use.

---

## 11. Visual Design

Use a modern, minimal, clean, professional design.

### Design Principles

- Strong visual hierarchy
- Consistent spacing
- Rounded but professional controls
- Clear typography
- Subtle shadows
- Clear operator differentiation
- High contrast
- Minimal unnecessary decoration

Avoid:

- Excessive gradients
- Visual clutter
- Tiny buttons
- Excessive animation
- Inconsistent colors
- Default browser styling

The application should resemble a high-quality modern calculator product.

---

## 12. Interaction Design

Buttons must support the following states:

### Default

Normal appearance.

### Hover

Subtle visual change such as brightness, opacity, or elevation.

### Active/Pressed

The button should visibly respond when pressed.

### Focus

Keyboard-focused buttons must have a clear focus indicator.

### Disabled

Controls that cannot currently be used should visually communicate their disabled state.

### Animation

Use subtle animations, generally around:

```text
100–200 ms
```

Avoid excessive animation.

---

## 13. Calculation Logic

Use a structured expression model rather than arbitrary code execution.

### Security Requirement

Do NOT evaluate expressions using:

```javascript
eval()
```

or an equivalent unsafe mechanism.

Implement a controlled parser/evaluator or a safe expression engine.

### Operator Precedence

Multiplication and division have higher precedence than addition and subtraction.

Example:

```text
2 + 3 × 4
```

must produce:

```text
14
```

not:

```text
20
```

### Left Associativity

Operators with equal precedence should be evaluated from left to right.

Example:

```text
20 ÷ 5 × 2
```

must produce:

```text
8
```

because:

```text
20 ÷ 5 = 4
4 × 2 = 8
```

---

## 14. Numeric Precision

Avoid unnecessary floating-point artifacts.

For example, do not display:

```text
0.30000000000000004
```

when the expected user-facing result is:

```text
0.3
```

Implement controlled number formatting.

Do not silently remove meaningful precision.

If configurable precision is implemented, clearly define the rounding behavior.

---

## 15. Error Handling

### Division by Zero

Input:

```text
10 ÷ 0
```

Display a clear message such as:

```text
Cannot divide by zero
```

The calculator must remain usable afterward.

### Malformed Expression

Prevent malformed expressions such as:

```text
10 + × 5
```

Prefer preventing invalid sequences rather than allowing them.

### Repeated Operators

Input:

```text
10 + + 5
```

must not create an invalid expression.

Recommended behavior:

```text
10 + ×
```

becomes:

```text
10 ×
```

when the user changes the operator.

### Multiple Decimals

Prevent:

```text
5.6.7
```

### Overflow

If a number becomes too large for normal display:

- Use scientific notation, or
- Display a controlled overflow message.

Never allow the display to break the layout.

---

## 16. Edge Cases

### Empty Calculation

Pressing `=` with no meaningful expression must not crash.

### Starting With Operator

Input such as:

```text
+ 5
```

must be either prevented or handled deterministically.

### Consecutive Equals

Example:

```text
5 + 5 = =
```

Define deterministic behavior.

Recommended behavior:

```text
10
15
```

if repeated equals repeats the previous operation.

### Negative Numbers

Support:

```text
-25
```

and:

```text
-25 × -2
```

### Decimal Zero

Support:

```text
0.5
```

### Leading Zeros

Avoid unnecessary forms such as:

```text
00025
```

unless they are intentionally entered as part of a valid number.

---

## 17. Accessibility

The application must follow modern accessibility practices.

### Button Labels

Every button must have a meaningful accessible name.

Examples:

```text
AC → "Clear calculator"
⌫ → "Delete"
÷ → "Divide"
× → "Multiply"
```

### Keyboard Navigation

Users must be able to navigate controls using:

```text
Tab
Shift + Tab
Enter
Space
```

### Focus

Focus indicators must remain clearly visible.

### Contrast

Text and interactive controls must have sufficient contrast.

### Screen Readers

The display should expose the current calculator value appropriately.

Error messages should be announced where practical using an appropriate live region.

---

## 18. Keyboard Support

Support:

| Key | Action |
|---|---|
| `0–9` | Number input |
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `.` | Decimal |
| `%` | Percentage |
| `Enter` | Equals |
| `=` | Equals |
| `Backspace` | Delete |
| `Escape` | Clear |

Keyboard shortcuts must not unnecessarily interfere with normal browser behavior.

---

## 19. Responsive Design

The application must work correctly at:

### Desktop

Example:

```text
1440 × 900
```

### Tablet

Example:

```text
768 × 1024
```

### Mobile

Example:

```text
390 × 844
```

### Mobile Requirements

- Buttons must be large enough for touch.
- No horizontal page scrolling.
- Display must remain readable.
- History should collapse into a drawer/modal/bottom sheet.
- Calculator should fit naturally within the viewport.

### Desktop Requirements

Use available space intelligently.

The calculator should remain visually centered and should not stretch unnecessarily across the entire screen.

---

## 20. Technical Requirements

Use a modern component-based architecture.

Recommended conceptual structure:

```text
src/
├── components/
│   ├── Calculator
│   ├── Display
│   ├── Keypad
│   ├── CalculatorButton
│   ├── History
│   └── Header
│
├── logic/
│   ├── calculator
│   ├── parser
│   ├── formatter
│   └── percentage
│
├── hooks/
│   └── calculatorState
│
├── utils/
│   └── keyboard
│
└── styles/
```

The exact framework and folder structure may be adapted to Antigravity's recommended project setup, but the application must remain modular and maintainable.

Use reusable components instead of implementing the entire application in one component.

---

## 21. Data/State Management

Maintain centralized calculator state containing concepts such as:

```text
currentValue
expression
previousValue
operator
waitingForOperand
error
history
```

The exact implementation may differ, but state transitions must remain deterministic.

### Example

Initial state:

```text
currentValue = "0"
expression = ""
error = null
```

After:

```text
25 + 10
```

the state should represent the active expression.

After equals:

```text
currentValue = "35"
```

---

## 22. History Persistence

Prefer browser local storage for calculation history.

Conceptual structure:

```json
{
  "expression": "25 × 4",
  "result": "100",
  "timestamp": "2026-09-23T12:00:00"
}
```

Limit history to a reasonable maximum number of records, such as 100, to prevent uncontrolled storage growth.

---

## 23. Testing Requirements

Test the calculator at multiple levels.

### Unit Tests

Test:

- Addition
- Subtraction
- Multiplication
- Division
- Operator precedence
- Decimal calculations
- Percentage
- Negative values
- Delete
- Clear
- Error handling
- Number formatting

Required examples:

```text
2 + 3 = 5
10 − 4 = 6
6 × 7 = 42
20 ÷ 5 = 4
2 + 3 × 4 = 14
```

### Interaction Tests

Test:

- Every calculator button
- Keyboard input
- Backspace
- Enter
- Escape
- Focus states
- Hover states
- Touch interaction

### Responsive Tests

Test at:

```text
320px
375px
390px
768px
1024px
1440px
1920px
```

No layout should break.

### Error Tests

Test:

```text
10 ÷ 0
5.5.5
+ × −
999999999999999999999999
```

---

## 24. Performance Requirements

The calculator should feel instantaneous.

Target:

- Button response: effectively immediate
- Calculation: under 100 ms under normal conditions
- History update: under 100 ms
- No visible UI lag
- No unnecessary re-rendering
- No memory leaks

The app should load quickly and avoid unnecessary external dependencies.

---

## 25. Optional Enhancements

### Dark/Light Theme

Allow users to switch between:

```text
Light
Dark
```

Persist the selected theme.

### Scientific Calculator

Optional functions:

```text
sin
cos
tan
log
ln
√
x²
xʸ
π
e
```

Scientific mode should be separate from standard mode so that the standard interface remains uncluttered.

### Memory

Optional:

```text
MC
MR
M+
M-
```

### History Search

Allow users to search previous expressions.

Example:

```text
Search history: 25
```

### Configurable Precision

Allow users to configure maximum displayed decimal places.

---

## 26. Production-Quality Requirements

The Antigravity development agent must not stop after producing the first working version.

Follow this cycle:

```text
Plan
 ↓
Implement
 ↓
Run
 ↓
Test
 ↓
Inspect UI
 ↓
Identify problems
 ↓
Refine
 ↓
Retest
 ↓
Final polish
```

The agent must actively check for:

- Broken layouts
- Incorrect calculations
- Overflow
- Poor mobile spacing
- Inconsistent button sizes
- Accessibility problems
- Keyboard issues
- Visual inconsistencies
- Console errors

Do not consider the task complete merely because the application launches.

---

## 27. Acceptance Criteria

### Calculator

- [ ] Numbers 0–9 work.
- [ ] Addition works.
- [ ] Subtraction works.
- [ ] Multiplication works.
- [ ] Division works.
- [ ] Decimal numbers work.
- [ ] Percentage works.
- [ ] ± works.
- [ ] AC resets the calculator.
- [ ] Delete removes the last input.
- [ ] Equals evaluates expressions.
- [ ] Chained calculations work.
- [ ] Operator precedence works correctly.

### Validation

- [ ] Division by zero is handled.
- [ ] Multiple decimal points are prevented.
- [ ] Invalid operator sequences are prevented or handled.
- [ ] Very large numbers do not break the layout.
- [ ] Floating-point artifacts are appropriately formatted.
- [ ] Invalid expressions never crash the application.

### History

- [ ] Successful calculations appear in history.
- [ ] Newest calculations appear first.
- [ ] History displays expression and result.
- [ ] History can be cleared.
- [ ] Clearing history does not clear the active calculator.
- [ ] Previous calculations can be restored/reused.
- [ ] History persistence works after page reload when local storage is enabled.

### Keyboard

- [ ] Number keys work.
- [ ] `+` works.
- [ ] `-` works.
- [ ] `*` works.
- [ ] `/` works.
- [ ] `.` works.
- [ ] `%` works.
- [ ] Enter/`=` calculates.
- [ ] Backspace deletes.
- [ ] Escape clears.

### UI

- [ ] Display is large and readable.
- [ ] Buttons are visually organized.
- [ ] Operators are visually distinguishable.
- [ ] Buttons have hover states.
- [ ] Buttons have pressed states.
- [ ] Keyboard focus is visible.
- [ ] Spacing is consistent.
- [ ] Animations are subtle.
- [ ] Inappropriate default browser styling is removed.

### Responsive

- [ ] Works on desktop.
- [ ] Works on tablet.
- [ ] Works on mobile.
- [ ] No horizontal scrolling.
- [ ] Buttons remain touch-friendly.
- [ ] Display remains readable.
- [ ] History adapts appropriately to small screens.

### Accessibility

- [ ] All buttons have meaningful accessible names.
- [ ] Keyboard navigation works.
- [ ] Focus indicators are visible.
- [ ] Contrast is sufficient.
- [ ] Screen-reader users can understand the calculator state.
- [ ] Error states are understandable.

### Quality

- [ ] No console errors.
- [ ] No broken interactions.
- [ ] No calculation crashes.
- [ ] No obvious layout defects.
- [ ] No unnecessary dependencies.
- [ ] Application feels production-ready rather than like a prototype.

---

## 28. Final Antigravity Build Instruction

Build the calculator according to this PRD as a complete production-quality application.

Do not create a static mockup.

Implement all MUST-HAVE functionality, robust calculator state management, controlled expression evaluation, calculation history, keyboard support, responsive behavior, accessibility, error handling, and polished interactions.

After implementation:

1. Run the application.
2. Test every calculator operation.
3. Test keyboard controls.
4. Test invalid calculations.
5. Test calculation history.
6. Test mobile and desktop layouts.
7. Inspect the UI for spacing, sizing, typography, contrast, and alignment.
8. Fix all discovered issues.
9. Retest after fixes.
10. Only then consider the application complete.

The final result must feel like a modern, polished calculator product — not a basic HTML/JavaScript calculator demo.
