import { TokenType, PRECEDENCE } from '../utils/constants.js';

/**
 * Base Token class
 */
export class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}

/**
 * Number Token
 */
export class NumberToken extends Token {
  constructor(value) {
    super(TokenType.NUMBER, value);
  }

  getValue() {
    return parseFloat(this.value);
  }
}

/**
 * Operator Token with precedence
 */
export class OperatorToken extends Token {
  constructor(value) {
    super(TokenType.OPERATOR, value);
    this.precedence = PRECEDENCE[value] || 0;
  }
}

/**
 * Function Token (sin, cos, tan, etc.)
 */
export class FunctionToken extends Token {
  constructor(value) {
    super(TokenType.FUNCTION, value);
  }
}

/**
 * Left Parenthesis Token
 */
export class LParenToken extends Token {
  constructor() {
    super(TokenType.LPAREN, '(');
  }
}

/**
 * Right Parenthesis Token
 */
export class RParenToken extends Token {
  constructor() {
    super(TokenType.RPAREN, ')');
  }
}
