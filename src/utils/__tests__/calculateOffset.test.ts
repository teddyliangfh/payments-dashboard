import { describe, it, expect } from 'vitest';
import { calculateOffset } from '../calculateOffset';

describe('calculateOffset', () => {
    it('should return the correct offset when the selected day is after the current day', () => {
        expect(calculateOffset(2, 5)).toBe(3); // Tuesday (2) to Friday (5)
        expect(calculateOffset(0, 1)).toBe(1); // Sunday (0) to Monday (1)
    });

    it('should return the correct offset when the selected day is before the current day', () => {
        expect(calculateOffset(5, 2)).toBe(4); // Friday (5) to Tuesday (2)
        expect(calculateOffset(6, 4)).toBe(5); // Saturday (6) to Thursday (4)
    });

    it('should return 0 when the current day and selected day are the same', () => {
        expect(calculateOffset(3, 3)).toBe(0); // Wednesday (3) to Wednesday (3)
    });

    it('should handle edge cases correctly', () => {
        expect(calculateOffset(6, 0)).toBe(1); // Saturday (6) to Sunday (0)
        expect(calculateOffset(0, 6)).toBe(6); // Sunday (0) to Saturday (6)
    });
});