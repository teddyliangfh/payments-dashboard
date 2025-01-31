
/**
 * Calculates the next payment date based on the selected day of the week.
 *
 * @param selectedDay - The day of the week selected for the payment (0 for Sunday, 1 for Monday, ..., 6 for Saturday).
 * @param currentComingPayDate - The current upcoming payment date.
 * @param currentDay - The current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday).
 * @returns The next payment date as a Date object.
 */
export const calculateNextPaymentDate = (selectedDay: number, currentComingPayDate: Date, currentDay: number): Date => {
    const newDate = new Date(currentComingPayDate);
    const offsetInDays = selectedDay - currentDay;
    if (offsetInDays < 0) {
        newDate.setDate(newDate.getDate() + offsetInDays + 7);
    } else {
        newDate.setDate(newDate.getDate() + offsetInDays);
    }
    return newDate;
};