import { describe, it, expect } from 'vitest';
import { calculateNextPaymentDate } from '@/utils/calculateNextPaymentDate';

describe('calculateNextPaymentDate', () => {
    it('should calculate the next payment date when the selected day is after the current day', () => {
        const selectedDay = 5; // Friday
        const currentComingPayDate = new Date('2025-02-02'); // Sunday
        const currentDay = 0; // Sunday
        const expectedDate = new Date('2025-02-07'); // Friday
        const result = calculateNextPaymentDate(selectedDay, currentComingPayDate, currentDay);
        expect(result).toEqual(expectedDate);
    });

    it('should calculate the next payment date when the selected day is before the current day', () => {
        const selectedDay = 2; // Tuesday
        const currentComingPayDate = new Date('2025-02-06'); // Thursday
        const currentDay = 4; // Thursday
        const expectedDate = new Date('2025-02-11'); // Next Tuesday
        const result = calculateNextPaymentDate(selectedDay, currentComingPayDate, currentDay);
        expect(result).toEqual(expectedDate);
    });

    it('should calculate the next payment date when the selected day is the same as the current day', () => {
        const selectedDay = 3; // Wednesday
        const currentComingPayDate = new Date('2025-02-05'); // Wednesday
        const currentDay = 3; // Wednesday
        const expectedDate = new Date('2025-02-05'); // Same Wednesday
        const result = calculateNextPaymentDate(selectedDay, currentComingPayDate, currentDay);
        expect(result).toEqual(expectedDate);
    });

    it('should handle the case when the current date is at the end of the month', () => {
        const selectedDay = 1; // Monday
        const currentComingPayDate = new Date('2025-02-28'); // Friday
        const currentDay = 5; // Friday
        const expectedDate = new Date('2025-03-03'); // Next Monday
        const result = calculateNextPaymentDate(selectedDay, currentComingPayDate, currentDay);
        expect(result).toEqual(expectedDate);
    });

    it('should handle the case when the current date is at the end of the year', () => {
        const selectedDay = 0; // Sunday
        const currentComingPayDate = new Date('2025-12-31'); // Wednesday
        const currentDay = 3; // Wednesday
        const expectedDate = new Date('2026-01-04'); // Next Sunday
        const result = calculateNextPaymentDate(selectedDay, currentComingPayDate, currentDay);
        expect(result).toEqual(expectedDate);
    });
});