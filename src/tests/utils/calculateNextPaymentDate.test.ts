import { describe, it, expect } from 'vitest';
import { calculateNextPaymentDate } from '@/utils/calculateNextPaymentDate';

describe('calculateNextPaymentDate', () => {
    it('should calculate the next payment date based on the offset in days', () => {
        const offsetInDays = 5;
        const currentComingPayDate = new Date('2025-02-02'); // Sunday
        const expectedDate = new Date('2025-02-07'); // Friday
        const result = calculateNextPaymentDate(offsetInDays, currentComingPayDate);
        expect(result).toEqual(expectedDate);
    });

    it('should handle zero offset correctly', () => {
        const offsetInDays = 0;
        const currentComingPayDate = new Date('2025-02-05'); // Wednesday
        const expectedDate = new Date('2025-02-05'); // Same Wednesday
        const result = calculateNextPaymentDate(offsetInDays, currentComingPayDate);
        expect(result).toEqual(expectedDate);
    });

    it('should handle the case when the current date is at the end of the month', () => {
        const offsetInDays = 3;
        const currentComingPayDate = new Date('2025-02-28'); // Friday
        const expectedDate = new Date('2025-03-03'); // Next Monday
        const result = calculateNextPaymentDate(offsetInDays, currentComingPayDate);
        expect(result).toEqual(expectedDate);
    });

    it('should handle the case when the current date is at the end of the year', () => {
        const offsetInDays = 4;
        const currentComingPayDate = new Date('2025-12-31'); // Wednesday
        const expectedDate = new Date('2026-01-04'); // Next Sunday
        const result = calculateNextPaymentDate(offsetInDays, currentComingPayDate);
        expect(result).toEqual(expectedDate);
    });
});