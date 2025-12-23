import { describe, it, expect } from 'vitest';
import { Evaluator } from '../../src/core/Evaluator.js';
import { Parser } from '../../src/core/Parser.js';

describe('Evaluator', () => {
    const parser = new Parser();
    const evaluator = new Evaluator('DEG');

    it('should evaluate simple addition', () => {
        const rpn = parser.parse('2 + 3');
        const result = evaluator.evaluate(rpn);
        expect(result).toBe(5);
    });

    it('should evaluate with correct precedence', () => {
        const rpn = parser.parse('2 + 3 × 4');
        const result = evaluator.evaluate(rpn);
        expect(result).toBe(14); // 2 + (3 × 4) = 14
    });

    it('should evaluate function', () => {
        const rpn = parser.parse('sin(30)');
        const result = evaluator.evaluate(rpn);
        expect(result).toBeCloseTo(0.5, 2);
    });

    it('should throw error for division by zero', () => {
        const rpn = parser.parse('10 ÷ 0');
        expect(() => evaluator.evaluate(rpn)).toThrow('Division by zero');
    });
});
