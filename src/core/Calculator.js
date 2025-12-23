import { Parser } from './Parser.js';
import { Evaluator } from './Evaluator.js';
import { ErrorType } from '../utils/constants.js';

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
   * Toggle angle mode (DEG/RAD)
   */
  toggleAngleMode() {
    this.angleMode = this.angleMode === 'DEG' ? 'RAD' : 'DEG';
    this.evaluator = new Evaluator(this.angleMode);
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

    // Regular notation with max 10 decimal places
    return parseFloat(num.toFixed(10)).toString();
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
