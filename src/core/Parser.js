import { TokenType } from '../utils/constants.js';
import { Tokenizer } from './Tokenizer.js';
import { ErrorType } from '../utils/constants.js';

/**
 * Parser - converts infix notation to RPN using Shunting-yard algorithm
 */
export class Parser {
  constructor() {
    this.tokenizer = new Tokenizer();
  }

  /**
   * Parse expression string to RPN tokens
   */
  parse(expression) {
    const tokens = this.tokenizer.tokenize(expression);
    return this.toRPN(tokens);
  }

  /**
   * Shunting-yard algorithm: convert infix to postfix (RPN)
   */
  toRPN(tokens) {
    const output = [];
    const operators = [];

    for (const token of tokens) {
      if (token.type === TokenType.NUMBER) {
        output.push(token);
      } else if (token.type === TokenType.FUNCTION) {
        operators.push(token);
      } else if (token.type === TokenType.OPERATOR) {
        while (
          operators.length > 0 &&
          operators[operators.length - 1].type === TokenType.OPERATOR &&
          operators[operators.length - 1].precedence >= token.precedence
        ) {
          output.push(operators.pop());
        }
        operators.push(token);
      } else if (token.type === TokenType.LPAREN) {
        operators.push(token);
      } else if (token.type === TokenType.RPAREN) {
        while (operators.length > 0 && operators[operators.length - 1].type !== TokenType.LPAREN) {
          output.push(operators.pop());
        }
        if (operators.length === 0) {
          throw new Error(`${ErrorType.SYNTAX_ERROR}: Mismatched parentheses`);
        }
        operators.pop(); // Remove left parenthesis

        // If there's a function on top, pop it to output
        if (operators.length > 0 && operators[operators.length - 1].type === TokenType.FUNCTION) {
          output.push(operators.pop());
        }
      }
    }

    // Pop remaining operators
    while (operators.length > 0) {
      const op = operators.pop();
      if (op.type === TokenType.LPAREN) {
        throw new Error(`${ErrorType.SYNTAX_ERROR}: Mismatched parentheses`);
      }
      output.push(op);
    }

    return output;
  }
}
