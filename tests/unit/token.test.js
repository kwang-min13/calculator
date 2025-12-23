import { describe, it, expect } from 'vitest';
import {
    Token,
    NumberToken,
    OperatorToken,
    FunctionToken,
    LParenToken,
    RParenToken,
} from '../../src/core/Token.js';
import { TokenType } from '../../src/utils/constants.js';

describe('Token', () => {
    it('should create a token with type and value', () => {
        const token = new Token(TokenType.NUMBER, '42');
        expect(token.type).toBe(TokenType.NUMBER);
        expect(token.value).toBe('42');
        expect(token.getValue()).toBe('42');
    });
});

describe('NumberToken', () => {
    it('should parse value as float', () => {
        const token = new NumberToken('3.14');
        expect(token.type).toBe(TokenType.NUMBER);
        expect(token.getValue()).toBe(3.14);
    });

    it('should handle integer values', () => {
        const token = new NumberToken('42');
        expect(token.getValue()).toBe(42);
    });
});

describe('OperatorToken', () => {
    it('should have correct precedence for addition', () => {
        const token = new OperatorToken('+');
        expect(token.type).toBe(TokenType.OPERATOR);
        expect(token.precedence).toBe(1);
    });

    it('should have correct precedence for multiplication', () => {
        const token = new OperatorToken('×');
        expect(token.precedence).toBe(2);
    });

    it('should have correct precedence for power', () => {
        const token = new OperatorToken('^');
        expect(token.precedence).toBe(3);
    });
});

describe('FunctionToken', () => {
    it('should create function token', () => {
        const token = new FunctionToken('sin');
        expect(token.type).toBe(TokenType.FUNCTION);
        expect(token.value).toBe('sin');
    });
});

describe('ParenToken', () => {
    it('should create left parenthesis token', () => {
        const token = new LParenToken();
        expect(token.type).toBe(TokenType.LPAREN);
        expect(token.value).toBe('(');
    });

    it('should create right parenthesis token', () => {
        const token = new RParenToken();
        expect(token.type).toBe(TokenType.RPAREN);
        expect(token.value).toBe(')');
    });
});
