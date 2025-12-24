import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../../src/core/Calculator.js';

describe('Calculator Memory Functions', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    it('should initialize memory to 0', () => {
        expect(calculator.memory).toBe(0);
    });

    it('should add to memory (M+)', () => {
        calculator.result = '10';
        calculator.memoryAdd();
        expect(calculator.memory).toBe(10);

        calculator.result = '5';
        calculator.memoryAdd();
        expect(calculator.memory).toBe(15);
    });

    it('should subtract from memory (M-)', () => {
        calculator.memory = 20;
        calculator.result = '5';
        calculator.memorySubtract();
        expect(calculator.memory).toBe(15);
    });

    it('should clear memory (MC)', () => {
        calculator.memory = 10;
        calculator.memoryClear();
        expect(calculator.memory).toBe(0);
    });

    it('should recall memory (MR)', () => {
        calculator.memory = 15;
        calculator.memoryRecall();
        expect(calculator.expression).toBe('15');
    });

    it('should recall negative memory with parenthesis', () => {
        calculator.memory = -5;
        calculator.memoryRecall();
        expect(calculator.expression).toBe('(-5)');
    });

    it('should append memory value to existing expression', () => {
        calculator.expression = '10+';
        calculator.memory = 5;
        calculator.memoryRecall();
        expect(calculator.expression).toBe('10+5');
    });
});
