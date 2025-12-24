import { Parser } from './Parser.js';
import { Evaluator } from './Evaluator.js';
import { ErrorType } from '../utils/constants.js';
import { StorageManager } from '../utils/storage.js';

/**
 * Calculator Engine - main calculator class
 */
export class Calculator {
  constructor() {
    this.expression = '';
    this.result = '0';
    this.angleMode = 'DEG';
    this.error = null;
    this.parser = new Parser();
    this.evaluator = new Evaluator(this.angleMode);
    this.memory = 0;

    this.storage = new StorageManager();
    this.history = [];
    this.settings = { precision: 10 };
    this.loadState();
  }

  loadState() {
    const state = this.storage.loadState();
    if (state) {
      if (state.angleMode) {
        this.angleMode = state.angleMode;
        this.evaluator = new Evaluator(this.angleMode);
      }
      if (state.history) {
        this.history = state.history;
      }
      if (state.settings) {
        this.settings = { ...this.settings, ...state.settings };
      }
      // Note: Memory is not currently in StorageManager default structure, maybe add it later?
      // adhering to plan: just history for now.
    }
  }

  saveState() {
    try {
      this.storage.saveState({
        angleMode: this.angleMode,
        history: this.history,
        settings: this.settings,
        // memory: this.memory // Potential future addition
      });
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }

  /**
   * Input a digit or decimal point
   */
  inputDigit(digit) {
    if (this.error) {
      this.clear();
    }
    this.expression += digit;
  }

  /**
   * Input an operator
   */
  inputOperator(operator) {
    if (this.error) {
      this.clear();
    }
    this.expression += ` ${operator} `;
  }

  /**
   * Input a function
   */
  inputFunction(func) {
    if (this.error) {
      this.clear();
    }
    this.expression += `${func}(`;
  }

  /**
   * Calculate the result
   */
  calculate() {
    try {
      const rpn = this.parser.parse(this.expression);
      const result = this.evaluator.evaluate(rpn);

      // Handle special cases
      if (!isFinite(result)) {
        throw new Error(`${ErrorType.OVERFLOW_ERROR}: Result is too large`);
      }

      this.result = this.formatResult(result);
      this.error = null;

      this.addToHistory(this.expression, this.result);
    } catch (err) {
      this.error = err.message;
      this.result = this.getErrorMessage(err.message);
    }
  }

  /**
   * Clear all (AC)
   */
  clear() {
    this.expression = '';
    this.result = '0';
    this.error = null;
  }

  /**
   * Backspace - remove last character
   */
  backspace() {
    if (this.error) {
      this.clear();
      return;
    }
    this.expression = this.expression.trim().slice(0, -1);
  }

  /**
   * Input a parenthesis - Smart toggle
   */
  inputParenthesis() {
    if (this.error) {
      this.clear();
    }

    const openCount = (this.expression.match(/\(/g) || []).length;
    const closeCount = (this.expression.match(/\)/g) || []).length;

    const lastChar = this.expression.trim().slice(-1);
    const isLastDigit = /\d|\)/.test(lastChar);

    if (openCount > closeCount && isLastDigit) {
      this.expression += ')';
    } else {
      // Implicit multiplication if previously a digit or closing paren? 
      // Standard calc behavior: 2( -> 2*( usually.
      // But for now let's just input (.
      // Actually, if we are just appending string:
      this.expression += '(';
    }
  }

  /**
   * Toggle angle mode (DEG/RAD)
   */
  toggleAngleMode() {
    this.angleMode = this.angleMode === 'DEG' ? 'RAD' : 'DEG';
    this.evaluator = new Evaluator(this.angleMode);
    this.saveState();
  }

  addToHistory(expression, result) {
    const item = {
      expression,
      result,
      timestamp: Date.now(),
    };

    // Add to beginning
    this.history.unshift(item);

    // Limit history size (default 50)
    if (this.history.length > 50) {
      this.history.pop();
    }

    this.saveState();
  }

  clearHistory() {
    this.history = [];
    this.saveState();
  }

  /**
   * Memory Add (M+)
   */
  memoryAdd() {
    if (this.error) return;
    // If there is an evaluated result, use it. 
    // If the user is typing, we might need to evaluate or just take current number if possible.
    // For simplicity, let's assume M+ acts on the current 'result' displayed.
    // NOTE: In many calculators, M+ evaluates the current expression first if pending.
    // Here we will use the current 'result' state.
    const val = parseFloat(this.result);
    if (!isNaN(val)) {
      this.memory += val;
    }
  }

  /**
   * Memory Subtract (M-)
   */
  memorySubtract() {
    if (this.error) return;
    const val = parseFloat(this.result);
    if (!isNaN(val)) {
      this.memory -= val;
    }
  }

  /**
   * Memory Recall (MR)
   */
  memoryRecall() {
    if (this.error) {
      this.clear();
    }
    // Treat memory value as input
    const memStr = this.memory.toString();
    // If memory is negative, parens might be needed if following an operator? 
    // Tokenizer handles negative numbers if they are at start or after operator?
    // Let's just append digits.
    if (this.memory < 0) {
      this.expression += `(${memStr})`;
    } else {
      this.expression += memStr;
    }
  }

  /**
   * Memory Clear (MC)
   */
  memoryClear() {
    this.memory = 0;
  }

  /**
   * Format result for display
   */
  formatResult(result) {
    const num = parseFloat(result);

    // Scientific notation for very large or small numbers
    if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-10 && num !== 0)) {
      return num.toExponential(6);
    }

    // Regular notation with configurable precision
    return parseFloat(num.toFixed(this.settings.precision)).toString();
  }

  /**
   * Get user-friendly error message
   */
  getErrorMessage(error) {
    if (error.includes(ErrorType.SYNTAX_ERROR)) {
      return 'Syntax Error';
    }
    if (error.includes(ErrorType.MATH_ERROR)) {
      return 'Math Error';
    }
    if (error.includes(ErrorType.OVERFLOW_ERROR)) {
      return 'Overflow';
    }
    return 'Error';
  }
}
