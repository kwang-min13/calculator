import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../../src/core/Calculator.js';

describe('Calculator', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    it('should perform basic addition', () => {
        calc.inputDigit('2');
        calc.inputOperator('+');
        calc.inputDigit('3');
        calc.calculate();
        expect(calc.result).toBe('5');
        expect(calc.error).toBeNull();
    });

    it('should handle operator precedence', () => {
        calc.inputDigit('2');
        calc.inputOperator('+');
        calc.inputDigit('3');
        calc.inputOperator('×');
        calc.inputDigit('4');
        calc.calculate();
        expect(calc.result).toBe('14'); // 2 + (3 × 4) = 14
    });

    it('should calculate sin function', () => {
        calc.angleMode = 'DEG';
        calc.inputFunction('sin');
        calc.inputDigit('30');
        calc.expression += ')';
        calc.calculate();
        expect(parseFloat(calc.result)).toBeCloseTo(0.5, 2);
    });

    it('should clear with AC', () => {
        calc.inputDigit('123');
        calc.clear();
        expect(calc.expression).toBe('');
        expect(calc.result).toBe('0');
    });

    it('should handle backspace', () => {
        calc.inputDigit('123');
        calc.backspace();
        expect(calc.expression).toBe('12');
    });

    it('should toggle angle mode', () => {
        expect(calc.angleMode).toBe('DEG');
        calc.toggleAngleMode();
        expect(calc.angleMode).toBe('RAD');
        calc.toggleAngleMode();
        expect(calc.angleMode).toBe('DEG');
    });

    it('should handle division by zero error', () => {
        calc.inputDigit('10');
        calc.inputOperator('÷');
        calc.inputDigit('0');
        calc.calculate();
        expect(calc.result).toBe('Math Error');
        expect(calc.error).toBeTruthy();
    });
});
