/**
 * Keyboard Handler - handles keyboard input
 */
export class KeyboardHandler {
  constructor(calculator, display) {
    this.calculator = calculator;
    this.display = display;
    this.init();
  }

  init() {
    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  handleKeyPress(e) {
    // Numbers and decimal point
    if (/^[0-9.]$/.test(e.key)) {
      this.calculator.inputDigit(e.key);
      this.updateDisplay();
      return;
    }

    // Operators
    const operatorMap = {
      '+': '+',
      '-': '-',
      '*': '×',
      '/': '÷',
      '^': '^',
    };

    if (operatorMap[e.key]) {
      e.preventDefault();
      this.calculator.inputOperator(operatorMap[e.key]);
      this.updateDisplay();
      return;
    }

    // Special keys
    if (e.key === 'Enter') {
      e.preventDefault();
      this.calculator.calculate();
      this.updateDisplay();
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      this.calculator.clear();
      this.updateDisplay();
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      this.calculator.backspace();
      this.updateDisplay();
      return;
    }

    // Parentheses
    if (e.key === '(' || e.key === ')') {
      this.calculator.inputDigit(e.key);
      this.updateDisplay();
      return;
    }
  }

  updateDisplay() {
    this.display.updateHistory(this.calculator.expression);
    if (this.calculator.error) {
      this.display.showError(this.calculator.result);
    } else {
      this.display.updateResult(this.calculator.result);
    }
  }
}
