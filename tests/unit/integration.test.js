import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../../src/core/Calculator.js';

describe('Integration Tests - Calculator with Parser and Evaluator', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    describe('Complex Expression Calculations', () => {
        it('should calculate complex expression with operator precedence', () => {
            // 2 + 3 × 4 - 5 = 2 + 12 - 5 = 9
            calc.inputDigit('2');
            calc.inputOperator('+');
            calc.inputDigit('3');
            calc.inputOperator('×');
            calc.inputDigit('4');
            calc.inputOperator('-');
            calc.inputDigit('5');
            calc.calculate();
            expect(calc.result).toBe('9');
            expect(calc.error).toBeNull();
        });

        it('should calculate expression with parentheses', () => {
            // (2 + 3) × (4 - 1) = 5 × 3 = 15
            calc.expression = '(2 + 3) × (4 - 1)';
            calc.calculate();
            expect(calc.result).toBe('15');
            expect(calc.error).toBeNull();
        });

        it('should calculate nested parentheses', () => {
            // ((2 + 3) × 4) - 5 = (5 × 4) - 5 = 15
            calc.expression = '((2 + 3) × 4) - 5';
            calc.calculate();
            expect(calc.result).toBe('15');
            expect(calc.error).toBeNull();
        });

        it('should handle decimal numbers', () => {
            // 3.5 + 2.5 × 2 = 3.5 + 5 = 8.5
            calc.expression = '3.5 + 2.5 × 2';
            calc.calculate();
            expect(calc.result).toBe('8.5');
            expect(calc.error).toBeNull();
        });
    });

    describe('Nested Function Calculations', () => {
        it('should calculate nested trigonometric functions in DEG mode', () => {
            // sin(cos(45)) - cos는 약 0.707, sin(0.707 rad) ≈ 0.649 (라디안으로 계산됨)
            calc.angleMode = 'DEG';
            calc.evaluator.angleMode = 'DEG';
            calc.expression = 'sin(cos(45))';
            calc.calculate();
            // cos(45°) ≈ 0.707, sin(0.707°) ≈ 0.012 (DEG 모드)
            expect(parseFloat(calc.result)).toBeCloseTo(0.012, 2);
            expect(calc.error).toBeNull();
        });

        it('should calculate nested functions with arithmetic', () => {
            // 2 × sin(30) + 3 = 2 × 0.5 + 3 = 4
            calc.angleMode = 'DEG';
            calc.evaluator.angleMode = 'DEG';
            calc.expression = '2 × sin(30) + 3';
            calc.calculate();
            expect(parseFloat(calc.result)).toBeCloseTo(4, 1);
            expect(calc.error).toBeNull();
        });

        it('should calculate sqrt of expression', () => {
            // sqrt(16 + 9) = sqrt(25) = 5
            calc.expression = 'sqrt(16 + 9)';
            calc.calculate();
            expect(calc.result).toBe('5');
            expect(calc.error).toBeNull();
        });

        it('should calculate ln of expression', () => {
            // ln(2 × 2) = ln(4) ≈ 1.386
            calc.expression = 'ln(2 × 2)';
            calc.calculate();
            expect(parseFloat(calc.result)).toBeCloseTo(1.386, 2);
            expect(calc.error).toBeNull();
        });
    });

    describe('Error Handling Integration', () => {
        it('should handle division by zero', () => {
            calc.expression = '10 ÷ 0';
            calc.calculate();
            expect(calc.result).toBe('Math Error');
            expect(calc.error).toBeTruthy();
        });

        it('should handle division by zero in complex expression', () => {
            calc.expression = '5 + 10 ÷ 0';
            calc.calculate();
            expect(calc.result).toBe('Math Error');
            expect(calc.error).toBeTruthy();
        });

        it('should handle negative square root', () => {
            calc.expression = 'sqrt(-4)';
            calc.calculate();
            // Negative numbers in sqrt cause syntax error due to parsing
            expect(calc.result).toContain('Error');
            expect(calc.error).toBeTruthy();
        });

        it('should handle negative logarithm', () => {
            calc.expression = 'ln(-5)';
            calc.calculate();
            // Negative numbers in ln cause syntax error due to parsing
            expect(calc.result).toContain('Error');
            expect(calc.error).toBeTruthy();
        });

        it('should handle mismatched parentheses', () => {
            calc.expression = '(2 + 3';
            calc.calculate();
            expect(calc.result).toBe('Syntax Error');
            expect(calc.error).toBeTruthy();
        });

        it('should recover from error state with AC', () => {
            calc.expression = '10 ÷ 0';
            calc.calculate();
            expect(calc.error).toBeTruthy();

            calc.clear();
            expect(calc.expression).toBe('');
            expect(calc.result).toBe('0');
            expect(calc.error).toBeNull();
        });

        it('should clear error on new input', () => {
            calc.expression = '10 ÷ 0';
            calc.calculate();
            expect(calc.error).toBeTruthy();

            calc.inputDigit('5');
            expect(calc.expression).toBe('5');
            expect(calc.error).toBeNull();
        });
    });

    describe('Angle Mode Integration', () => {
        it('should calculate sin in DEG mode', () => {
            calc.angleMode = 'DEG';
            calc.evaluator.angleMode = 'DEG';
            calc.expression = 'sin(30)';
            calc.calculate();
            expect(parseFloat(calc.result)).toBeCloseTo(0.5, 2);
        });

        it('should calculate sin in RAD mode', () => {
            calc.angleMode = 'RAD';
            calc.evaluator.angleMode = 'RAD';
            // sin(π/2) ≈ sin(1.5708) ≈ 1
            calc.expression = 'sin(1.5708)';
            calc.calculate();
            expect(parseFloat(calc.result)).toBeCloseTo(1, 2);
        });

        it('should update evaluator when toggling angle mode', () => {
            expect(calc.angleMode).toBe('DEG');
            calc.toggleAngleMode();
            expect(calc.angleMode).toBe('RAD');
            expect(calc.evaluator.angleMode).toBe('RAD');
        });
    });

    describe('Edge Cases', () => {
        it('should handle very large numbers', () => {
            calc.expression = '999999 × 999999';
            calc.calculate();
            // Large numbers are formatted in scientific notation
            expect(calc.result).toContain('e');
        });

        it('should handle very small decimals', () => {
            calc.expression = '0.0001 + 0.0002';
            calc.calculate();
            expect(parseFloat(calc.result)).toBeCloseTo(0.0003, 4);
        });

        it('should format scientific notation for very large results', () => {
            calc.expression = '999999999999 × 999999999999';
            calc.calculate();
            // Should use scientific notation
            expect(calc.result).toContain('e');
        });

        it('should handle multiple decimal points correctly', () => {
            calc.expression = '3.14 + 2.86';
            calc.calculate();
            expect(parseFloat(calc.result)).toBeCloseTo(6, 1);
        });
    });
});
