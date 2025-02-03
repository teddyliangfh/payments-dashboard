import { calculateOffset } from './calculateOffset';

/**
 * Calculates the next payment date based on the offset in days.
 *
 * @param offsetInDays - The number of days to offset from the current upcoming payment date.
 * @param currentComingPayDate - The current upcoming payment date.
 * @returns The next payment date as a Date object.
 */
export function calculateNextPaymentDate(offsetInDays: number, currentComingPayDate: Date): Date {
    const nextPaymentDate = new Date(currentComingPayDate);
    nextPaymentDate.setDate(currentComingPayDate.getDate() + offsetInDays);
    return nextPaymentDate;
}