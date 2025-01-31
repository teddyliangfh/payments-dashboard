export const updatePaymentPlan = (id: string, offsetInDays: number): Promise<{ message: string } | Error> => {
    // Mock API call
    return new Promise<{ message: string }>((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve({ message: "Payment schedule updated successfully" });
            } else {
                reject(new Error("Failed to update payment schedule"));
            }
        }, 1000);
    });
    // Replace above with actual API call like below, can use react query for better handling
    // const response = await fetch(`/payment-plan/${id}/offset-dates`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ offsetInDays }),
    // });
};