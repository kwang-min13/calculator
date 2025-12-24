import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Calculator } from '../../src/core/Calculator.js';

// Mock StorageManager
vi.mock('../../src/utils/storage.js', () => {
    const StorageManagerMock = vi.fn();
    StorageManagerMock.prototype.loadState = vi.fn().mockReturnValue(null);
    StorageManagerMock.prototype.saveState = vi.fn();
    return { StorageManager: StorageManagerMock };
});

describe('Calculator Settings', () => {
    let calculator;

    beforeEach(() => {
        vi.clearAllMocks();
        calculator = new Calculator();
    });

    it('should initialize with default settings (precision 10)', () => {
        expect(calculator.settings.precision).toBe(10);
    });

    it('should format result according to precision setting', () => {
        // Default precision 10
        calculator.settings.precision = 10;
        const res1 = calculator.formatResult(1 / 3);
        expect(res1).toBe('0.3333333333');

        // Change precision to 2
        calculator.settings.precision = 2;
        const res2 = calculator.formatResult(1 / 3);
        expect(res2).toBe('0.33');

        // Change precision to 0
        calculator.settings.precision = 0;
        const res3 = calculator.formatResult(1 / 3);
        expect(res3).toBe('0');
    });

    it('should save state when settings change', () => {
        // Directly modifying settings doesn't trigger save unless we call saveState, 
        // but typically UI calls saveState after modification.
        // Let's verify saveState includes settings.
        calculator.settings.precision = 5;
        calculator.saveState();

        expect(calculator.storage.saveState).toHaveBeenCalledWith(expect.objectContaining({
            settings: { precision: 5 }
        }));
    });
});
