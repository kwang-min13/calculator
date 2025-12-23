import { TokenType, ErrorType } from '../utils/constants.js';
import * as MathFunctions from '../utils/mathFunctions.js';

/**
 * Evaluator - evaluates RPN expression using stack
 */
export class Evaluator {
  constructor(angleMode = 'DEG') {
    this.angleMode = angleMode;
  }

  /**
   * Evaluate RPN tokens
   */
  evaluate(rpnTokens) {
    const stack = [];

    for (const token of rpnTokens) {
      if (token.type === TokenType.NUMBER) {
        stack.push(token.getValue());
      } else if (token.type === TokenType.OPERATOR) {
        if (stack.length < 2) {
          throw new Error(`${ErrorType.SYNTAX_ERROR}: Invalid expression`);
        }
        const b = stack.pop();
        const a = stack.pop();
        const result = this.applyOperator(token.value, a, b);
        stack.push(result);
      } else if (token.type === TokenType.FUNCTION) {
        if (stack.length < 1) {
          throw new Error(`${ErrorType.SYNTAX_ERROR}: Invalid expression`);
        }
        const arg = stack.pop();
        const result = this.applyFunction(token.value, arg);
        stack.push(result);
      }
    }

    if (stack.length !== 1) {
      throw new Error(`${ErrorType.SYNTAX_ERROR}: Invalid expression`);
    }

    return stack[0];
  }

  /**
   * Apply operator to two operands
   */
  applyOperator(op, a, b) {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        if (b === 0) {
          throw new Error(`${ErrorType.MATH_ERROR}: Division by zero`);
        }
        return a / b;
      case '^':
        return Math.pow(a, b);
      case '%':
        return a % b;
      default:
        throw new Error(`${ErrorType.SYNTAX_ERROR}: Unknown operator ${op}`);
    }
  }

  /**
   * Apply function to argument
   */
  applyFunction(func, arg) {
    switch (func) {
      case 'sin':
        return MathFunctions.sin(arg, this.angleMode);
      case 'cos':
        return MathFunctions.cos(arg, this.angleMode);
      case 'tan':
        return MathFunctions.tan(arg, this.angleMode);
      case 'ln':
        return MathFunctions.ln(arg);
      case 'log':
        return MathFunctions.log(arg);
      case 'sqrt':
        return MathFunctions.sqrt(arg);
      default:
        throw new Error(`${ErrorType.SYNTAX_ERROR}: Unknown function ${func}`);
    }
  }
}
