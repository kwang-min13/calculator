import { describe, it, expect } from 'vitest';
import { sin, cos, tan, ln, log, sqrt, pow } from '../../src/utils/mathFunctions.js';

describe('Math Functions', () => {
    describe('Trigonometric functions (DEG mode)', () => {
        it('should calculate sin(30) ≈ 0.5', () => {
            expect(sin(30, 'DEG')).toBeCloseTo(0.5, 2);
        });

        it('should calculate cos(60) ≈ 0.5', () => {
            expect(cos(60, 'DEG')).toBeCloseTo(0.5, 2);
        });

        it('should calculate tan(45) ≈ 1', () => {
            expect(tan(45, 'DEG')).toBeCloseTo(1, 2);
        });
    });

    describe('Logarithmic functions', () => {
        it('should calculate ln(e) ≈ 1', () => {
            expect(ln(Math.E)).toBeCloseTo(1, 5);
        });

        it('should calculate log(100) = 2', () => {
            expect(log(100)).toBe(2);
        });

        it('should throw error for ln of negative number', () => {
            expect(() => ln(-1)).toThrow('Invalid input for ln');
        });
    });

    describe('Other functions', () => {
        it('should calculate sqrt(9) = 3', () => {
            expect(sqrt(9)).toBe(3);
        });

        it('should throw error for sqrt of negative number', () => {
            expect(() => sqrt(-1)).toThrow('Invalid input for sqrt');
        });

        it('should calculate pow(2, 3) = 8', () => {
            expect(pow(2, 3)).toBe(8);
        });
    });
});
