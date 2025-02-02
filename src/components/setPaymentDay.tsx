"use client"

import { createListCollection, Button, VStack, Text, type SelectValueChangeDetails } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster"
import {
    SelectContent,
    SelectItem,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@/components/ui/select"
import { PaymentPlan } from "@/types/paymentPlan"
import { calculateNextPaymentDate, calculateOffset } from "@/utils"
import { updatePaymentPlan } from "@/apis/updatePaymentPlan"


type Props = {
    paymentPlan: PaymentPlan;
    onUpdateSuccess: () => void;
};


/**
 * Component for setting the payment day.
 * 
 * @component
 * @param {Props} Props - The properties object.
 * @param {Object} Props.paymentPlan - The payment plan object.
 * @param {Array} Props.paymentPlan.instalments - The array of instalments in the payment plan.
 * @param {string} Props.paymentPlan.instalments[].date - The date of the instalment.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * <SetPaymentDay paymentPlan={paymentPlan} />
 * 
 * @remarks
 * This component allows users to adjust their payment day by selecting a new day from a dropdown menu.
 * It displays the current payment day and the next updated payment date based on the selected day.
 * The component handles the update process, including validation, loading state, and displaying success or error messages.
 */
export function SetPaymentDay(Props: Props) {
    const { paymentPlan } = Props;
    const [loading, setLoading] = useState(false);
    // assume the first instalment is the current one
    const currentComingPayDate = new Date(paymentPlan.instalments[0].date);
    const currentDay = currentComingPayDate.getDay(); // 0-6 (Sun-Sat)
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [nextPaymentDate, setNextPaymentDate] = useState<string | null>(currentComingPayDate.toLocaleDateString());




    /**
     * Handles the update of the payment day.
     * 
     * This function performs the following steps:
     * 1. Checks if a day has been selected. If not, displays a warning message.
     * 2. Sets the loading state to true.
     * 3. Calculates the offset in days between the current day and the selected day.
     * 4. Attempts to update the payment plan with the new offset.
     * 5. Displays a success message if the update is successful.
     * 6. Displays an error message if the update fails.
     * 7. Resets the loading state.
     * 
     * @async
     * @function handleUpdatePaymentDay
     * @returns {Promise<void>} A promise that resolves when the update process is complete.
     */
    const handleUpdatePaymentDay = async () => {
        // TODO add a warning confirmation dialog here for better UX
        if (selectedDay === null) {
            toaster.create({
                title: "warning",
                description: "Please select a day to update the payment schedule",
                type: "warning",
                duration: 5000,
            })
            return;
        }
        setLoading(true);
        const offsetInDays = calculateOffset(currentDay, selectedDay);

        try {
            const response = await updatePaymentPlan(paymentPlan.id, offsetInDays);
            setLoading(false);
            toaster.create({
                title: "Success",
                description: response.message,
                type: "success",
                duration: 5000,
            });
        } catch (error) {
            toaster.create({
                title: "Error",
                description: "Failed to update payment schedule, please try again later",
                type: "error",
                duration: 5000,
            });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    const handleChange = (details: SelectValueChangeDetails<{ label: string; value: number; }>) => {
        setSelectedDay(Number(details.value[0]));
    }

    useEffect(() => {
        if (selectedDay !== null) {
            const newDate = calculateNextPaymentDate(selectedDay, currentComingPayDate, currentDay);
            setNextPaymentDate(newDate.toLocaleDateString());
        }
    }, [selectedDay]);


    return (
        <VStack bg="white" px={6} py={12} borderRadius={16} width="1/3" minW="360px" gap={2}>
            <Text fontSize="lg" fontWeight="bold">
                Adjust Your Payment Day
            </Text>
            <Text>
                <Text as={"span"} > Current Payment Day: </Text>
                <Text as={"span"} color="GrayText"> {weekDays.find(day => day.value === currentDay)?.label} </Text>
            </Text>
            <Text>
                <Text as={"span"} > Next Updated Payment Date: </Text>
                {/* To silence hydration warnings on an element: https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html*/}
                <Text as={"span"} color="GrayText" suppressHydrationWarning> {nextPaymentDate} </Text>
            </Text>

            <SelectRoot collection={selections} size="lg" width="80%" min-width="320px" onValueChange={handleChange} borderRadius={8} gap={4} data-testid="selector" mt={8}>
                <SelectTrigger>
                    <SelectValueText placeholder="Select Day" />
                </SelectTrigger>
                <SelectContent>
                    {selections.items.map((item) => (
                        <SelectItem item={item} key={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectContent>
                <Button
                    type="submit"
                    bgColor="grey"
                    color="white"
                    loading={loading}
                    disabled={loading}
                    onClick={handleUpdatePaymentDay}
                    data-testid="change-day-button"
                >
                    Change Payment Day
                </Button>
            </SelectRoot>
        </VStack>
    )
}

/**
 * Creates a list collection of days of the week with corresponding numeric values.
 * 
 * The `selections` object contains an array of items where each item represents a day of the week.
 * Each item has a `label` which is the name of the day and a `value` which is a numeric representation of the day.
 * 
 * The days are represented as follows:
 * - Sunday: 0
 * - Monday: 1
 * - Tuesday: 2
 * - Wednesday: 3
 * - Thursday: 4
 * - Friday: 5
 * - Saturday: 6
 * 
 * Note: The `value` corresponds to the day of the week as used in JavaScript's `Date` object.
 * Placing this constant outside the function improves performance and makes the code cleaner,
 * as it avoids recreating the constant on every function call.
 * 
 * @constant
 * @type {Object}
 * @property {Array<Object>} items - The array of day objects.
 * @property {string} items[].label - The name of the day.
 * @property {number} items[].value - The numeric representation of the day.
 */

const weekDays = [
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
    { label: "Sunday", value: 0 },
];

const selections = createListCollection({
    items: weekDays,
})


