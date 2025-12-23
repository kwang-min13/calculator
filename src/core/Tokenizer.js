import { NumberToken, OperatorToken, FunctionToken, LParenToken, RParenToken } from './Token.js';
import { ErrorType } from '../utils/constants.js';

/**
 * Tokenizer - converts expression string to tokens
 */
export class Tokenizer {
  tokenize(expression) {
    const tokens = [];
    let i = 0;

    while (i < expression.length) {
      const char = expression[i];

      // Skip whitespace
      if (/\s/.test(char)) {
        i++;
        continue;
      }

      // Numbers (including decimals)
      if (/\d/.test(char)) {
        let num = '';
        while (i < expression.length && /[\d.]/.test(expression[i])) {
          num += expression[i];
          i++;
        }
        tokens.push(new NumberToken(num));
        continue;
      }

      // Operators
      if (['+', '-', '×', '÷', '^', '%'].includes(char)) {
        tokens.push(new OperatorToken(char));
        i++;
        continue;
      }

      // Parentheses
      if (char === '(') {
        tokens.push(new LParenToken());
        i++;
        continue;
      }
      if (char === ')') {
        tokens.push(new RParenToken());
        i++;
        continue;
      }

      // Functions (sin, cos, tan, ln, log)
      if (/[a-z]/i.test(char)) {
        let func = '';
        while (i < expression.length && /[a-z]/i.test(expression[i])) {
          func += expression[i];
          i++;
        }
        tokens.push(new FunctionToken(func));
        continue;
      }

      // Special symbols
      if (char === '√') {
        tokens.push(new FunctionToken('sqrt'));
        i++;
        continue;
      }
      if (char === 'π') {
        tokens.push(new NumberToken(Math.PI.toString()));
        i++;
        continue;
      }

      // Invalid character
      throw new Error(`${ErrorType.SYNTAX_ERROR}: Invalid character '${char}'`);
    }

    return tokens;
  }
}
