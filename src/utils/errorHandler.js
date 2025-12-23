import { ErrorType, ERROR_MESSAGES } from './constants.js';

/**
 * Custom Calculator Error
 */
export class CalculatorError extends Error {
  constructor(type, message) {
    super(message);
    this.type = type;
    this.name = 'CalculatorError';
  }
}

/**
 * Error Handler
 */
export class ErrorHandler {
  static handle(error) {
    if (error instanceof CalculatorError) {
      return ERROR_MESSAGES[error.type] || 'Error';
    }

    // Parse error message for error type
    const message = error.message || '';
    if (message.includes(ErrorType.SYNTAX_ERROR)) {
      return ERROR_MESSAGES[ErrorType.SYNTAX_ERROR];
    }
    if (message.includes(ErrorType.MATH_ERROR)) {
      return ERROR_MESSAGES[ErrorType.MATH_ERROR];
    }
    if (message.includes(ErrorType.OVERFLOW_ERROR)) {
      return ERROR_MESSAGES[ErrorType.OVERFLOW_ERROR];
    }

    return 'Error';
  }
}
