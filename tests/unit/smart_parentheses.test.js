import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../../src/core/Calculator.js';

describe('Smart Parentheses', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    it('should input ( when expression is empty', () => {
        calculator.inputParenthesis();
        expect(calculator.expression).toBe('(');
    });

    it('should input ( when counting is balanced or biased towards closed', () => {
        calculator.expression = '(1+2)';
        calculator.inputParenthesis();
        // open=1, close=1 -> balanced -> (
        expect(calculator.expression).toBe('(1+2)(');
    });

    it('should input ) when open count > close count AND last char is digit', () => {
        calculator.expression = '(123';
        calculator.inputParenthesis();
        // open=1, close=0 -> unbalance -> last is digit -> )
        expect(calculator.expression).toBe('(123)');
    });

    it('should input ) when open count > close count AND last char is )', () => {
        calculator.expression = '((1)';
        calculator.inputParenthesis();
        // open=2, close=1 -> unbalance -> last is ) -> )
        expect(calculator.expression).toBe('((1))');
    });

    it('should input ( when open > close BUT last char is operator', () => {
        calculator.expression = '(1+';
        calculator.inputParenthesis();
        // open=1, close=0 -> unbalance -> last is + -> (
        expect(calculator.expression).toBe('(1+(');
    });

    it('should input ( when open > close BUT last char is (', () => {
        calculator.expression = '(';
        calculator.inputParenthesis();
        // open=1, close=0 -> unbalance -> last is ( -> (
        expect(calculator.expression).toBe('((');
    });
});
