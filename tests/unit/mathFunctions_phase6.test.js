import { describe, it, expect } from 'vitest';
import { asin, acos, atan, sinh, cosh, tanh, abs, fact } from '../../src/utils/mathFunctions.js';

describe('Phase 6 Math Functions', () => {
    describe('Inverse Trigonometric Functions', () => {
        it('should calculate asin correctly (DEG)', () => {
            expect(asin(0.5, 'DEG')).toBeCloseTo(30);
            expect(asin(1, 'DEG')).toBeCloseTo(90);
        });

        it('should calculate asin correctly (RAD)', () => {
            expect(asin(0.5, 'RAD')).toBeCloseTo(Math.PI / 6);
        });

        it('should throw error for invalid asin input', () => {
            expect(() => asin(2)).toThrow('MATH_ERROR');
        });

        it('should calculate acos correctly (DEG)', () => {
            expect(acos(0.5, 'DEG')).toBeCloseTo(60);
        });

        it('should calculate atan correctly (DEG)', () => {
            expect(atan(1, 'DEG')).toBeCloseTo(45);
        });
    });

    describe('Hyperbolic Functions', () => {
        it('should calculate sinh correctly', () => {
            expect(sinh(0)).toBe(0);
        });

        it('should calculate cosh correctly', () => {
            expect(cosh(0)).toBe(1);
        });

        it('should calculate tanh correctly', () => {
            expect(tanh(0)).toBe(0);
        });
    });

    describe('Utility Functions', () => {
        it('should calculate abstract value', () => {
            expect(abs(-5)).toBe(5);
            expect(abs(5)).toBe(5);
        });

        it('should calculate factorial', () => {
            expect(fact(5)).toBe(120);
            expect(fact(0)).toBe(1);
            expect(fact(1)).toBe(1);
        });

        it('should throw error for negative factorial', () => {
            expect(() => fact(-1)).toThrow('MATH_ERROR');
        });

        it('should throw error for non-integer factorial', () => {
            expect(() => fact(1.5)).toThrow('MATH_ERROR');
        });
    });
});
