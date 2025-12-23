import { describe, it, expect } from 'vitest';
import { Parser } from '../../src/core/Parser.js';

describe('Parser', () => {
    const parser = new Parser();

    it('should parse simple addition to RPN', () => {
        const rpn = parser.parse('2 + 3');
        expect(rpn).toHaveLength(3);
        expect(rpn[0].getValue()).toBe(2);
        expect(rpn[1].getValue()).toBe(3);
        expect(rpn[2].value).toBe('+');
    });

    it('should handle operator precedence correctly', () => {
        const rpn = parser.parse('2 + 3 × 4');
        expect(rpn).toHaveLength(5);
        // Expected: 2 3 4 × +
        expect(rpn[0].getValue()).toBe(2);
        expect(rpn[1].getValue()).toBe(3);
        expect(rpn[2].getValue()).toBe(4);
        expect(rpn[3].value).toBe('×');
        expect(rpn[4].value).toBe('+');
    });

    it('should handle parentheses correctly', () => {
        const rpn = parser.parse('(2 + 3) × 4');
        expect(rpn).toHaveLength(5);
        // Expected: 2 3 + 4 ×
        expect(rpn[0].getValue()).toBe(2);
        expect(rpn[1].getValue()).toBe(3);
        expect(rpn[2].value).toBe('+');
        expect(rpn[3].getValue()).toBe(4);
        expect(rpn[4].value).toBe('×');
    });

    it('should throw error for mismatched parentheses', () => {
        expect(() => parser.parse('(2 + 3')).toThrow('Mismatched parentheses');
        expect(() => parser.parse('2 + 3)')).toThrow('Mismatched parentheses');
    });
});
