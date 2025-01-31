/* mock payment plan data get from the BE，assuming it will return the next coming payment in the first place,
 and won't return the past payment? */
import { PaymentPlan } from "@/types/paymentPlan";
export const paymentPlanData: PaymentPlan = {
    id: "1",
    total: 1000,
    instalments: [{
        id: "1",
        date: "2025-02-01",
        amount: 250
    }, {
        id: "2",
        date: "2025-02-08",
        amount: 250
    }, {
        id: "3",
        date: "2025-02-15",
        amount: 250
    }, {
        id: "4",
        date: "2025-02-22",
        amount: 250
    }]
};