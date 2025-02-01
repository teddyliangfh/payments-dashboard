import { paymentPlanData } from "@/mock/paymentPlan";
import { PaymentPlan } from "@/types/paymentPlan";

export async function getPaymentPlan(): Promise<PaymentPlan> {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(paymentPlanData);
        }, 500);
    });
}
