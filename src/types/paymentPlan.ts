type Instalment = {
    id: string;
    date: string; // YYYY-MM-DD
    amount: number;
};

type PaymentPlan = {
    id: string;
    total: number;
    instalments: Instalment[];
};

export type { PaymentPlan, Instalment };