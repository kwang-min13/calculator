import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Calculator } from '../../src/core/Calculator.js';
import { StorageManager } from '../../src/utils/storage.js';

// Mock StorageManager
vi.mock('../../src/utils/storage.js', () => {
    const StorageManagerMock = vi.fn();
    StorageManagerMock.prototype.loadState = vi.fn().mockReturnValue(null);
    StorageManagerMock.prototype.saveState = vi.fn();
    return { StorageManager: StorageManagerMock };
});

describe('Calculator History', () => {
    let calculator;

    beforeEach(() => {
        vi.clearAllMocks();
        calculator = new Calculator();
    });

    it('should initialize with empty history', () => {
        expect(calculator.history).toEqual([]);
    });

    it('should add item to history after successful calculation', () => {
        calculator.expression = '2 + 2';
        calculator.calculate();

        expect(calculator.history.length).toBe(1);
        expect(calculator.history[0].expression).toBe('2 + 2');
        expect(calculator.history[0].result).toBe('4');
    });

    it('should not add to history if error occurs', () => {
        calculator.expression = '2 ÷ 0';
        calculator.calculate();

        expect(calculator.result).toBe('Math Error');
        expect(calculator.history.length).toBe(0);
    });

    it('should limit history size', () => {
        // Add 60 items
        for (let i = 0; i < 60; i++) {
            calculator.expression = `${i} + 1`;
            calculator.calculate();
        }

        expect(calculator.history.length).toBe(50);
        // The most recent one should be '59 + 1' -> '60' in history[0]
        expect(calculator.history[0].result).toBe('60');
    });

    it('should clear history', () => {
        calculator.expression = '1 + 1';
        calculator.calculate();
        expect(calculator.history.length).toBe(1);

        calculator.clearHistory();
        expect(calculator.history.length).toBe(0);
    });

    it('should save state when history updates', () => {
        calculator.expression = '5 × 5';
        calculator.calculate();
        expect(calculator.storage.saveState).toHaveBeenCalled();
    });
});
