import { describe, it, expect } from 'vitest';
import { Tokenizer } from '../../src/core/Tokenizer.js';
import { TokenType } from '../../src/utils/constants.js';

describe('Tokenizer', () => {
    const tokenizer = new Tokenizer();

    it('should tokenize a simple number', () => {
        const tokens = tokenizer.tokenize('123');
        expect(tokens).toHaveLength(1);
        expect(tokens[0].type).toBe(TokenType.NUMBER);
        expect(tokens[0].getValue()).toBe(123);
    });

    it('should tokenize simple addition', () => {
        const tokens = tokenizer.tokenize('2 + 3');
        expect(tokens).toHaveLength(3);
        expect(tokens[0].getValue()).toBe(2);
        expect(tokens[1].value).toBe('+');
        expect(tokens[2].getValue()).toBe(3);
    });

    it('should tokenize function with parentheses', () => {
        const tokens = tokenizer.tokenize('sin(30)');
        expect(tokens).toHaveLength(4);
        expect(tokens[0].type).toBe(TokenType.FUNCTION);
        expect(tokens[0].value).toBe('sin');
        expect(tokens[1].type).toBe(TokenType.LPAREN);
        expect(tokens[2].getValue()).toBe(30);
        expect(tokens[3].type).toBe(TokenType.RPAREN);
    });

    it('should tokenize complex expression', () => {
        const tokens = tokenizer.tokenize('2 + 3 × 4');
        expect(tokens).toHaveLength(5);
        expect(tokens[0].getValue()).toBe(2);
        expect(tokens[1].value).toBe('+');
        expect(tokens[2].getValue()).toBe(3);
        expect(tokens[3].value).toBe('×');
        expect(tokens[4].getValue()).toBe(4);
    });

    it('should throw error for invalid character', () => {
        expect(() => tokenizer.tokenize('2 @ 3')).toThrow('Invalid character');
    });
});
