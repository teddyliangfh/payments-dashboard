/**
 * Calculates the offset in days between the current day and the selected day.
 * 
 * @param currentDay - The current day of the week as a number (0-6), where 0 represents Sunday and 6 represents Saturday.
 * @param selectedDay - The selected day of the week as a number (0-6), where 0 represents Sunday and 6 represents Saturday.
 * @returns The number of days between the current day and the selected day. If the selected day is before the current day, 
 *          the offset will wrap around to the next week.
 * 
 * Examples:
 * | Current Day | Target Day | Calculation       | Result |
 * |-------------|------------|-------------------|--------|
 * | Tuesday (2) | Friday (5) | 5 - 2             | 3 days |
 * | Friday (5)  | Tuesday (2)| 7 - (5 - 2)       | 4 days |
 * | Sunday (0)  | Monday (1) | 1 - 0             | 1 day  |
 * | Saturday (6)| Thursday (4)| 7 - (6 - 4)      | 5 days |
 */
export const calculateOffset = (currentDay: number, selectedDay: number) => {
    return selectedDay >= currentDay
        ? selectedDay - currentDay
        : 7 - (currentDay - selectedDay);
};