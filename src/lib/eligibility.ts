import { differenceInDays, parseISO } from "date-fns";

export interface ItemEligibility {
    isEligible: boolean;
    reason?: string;
    status: "ELIGIBLE" | "FINAL_SALE" | "PAST_WINDOW" | "ALREADY_RETURNED" | "CONDITIONALLY_ELIGIBLE";
}

export function checkEligibility(item: any, orderDate: string, claimType: "RETURN" | "WARRANTY"): ItemEligibility {
    const daysSincePurchase = differenceInDays(new Date(), parseISO(orderDate));

    // 1. Warranty Flow: Generally more permissive on "time" but strict on rules.
    // For MVP, we assume all items are eligible for Warranty claim initiation unless explicitly blocked.
    if (claimType === "WARRANTY") {
        return { isEligible: true, status: "ELIGIBLE" };
    }

    // 2. Return Flow Logic

    // Rule: Final Sale
    // Assuming 'Final Sale' is tagged in metadata or categories (Mocking dependency here)
    const isFinalSale = item.name.toLowerCase().includes("final sale");
    if (isFinalSale) {
        return { isEligible: false, reason: "Item is Final Sale", status: "FINAL_SALE" };
    }

    // Rule: Return Window (e.g., 30 days for most, 100 for mattresses)
    // We need a way to know the category. Mocking based on name for MVP.
    const isMattress = item.name.toLowerCase().includes("mattress");
    const returnWindow = isMattress ? 100 : 30;

    if (daysSincePurchase > returnWindow) {
        return {
            isEligible: false,
            reason: `Return window expired (${returnWindow} days)`,
            status: "PAST_WINDOW"
        };
    }

    // Rule: Unboxed Mattresses (Soft Warning / Condition)
    // This logic usually happens *after* selection when asking "Is it boxed?", 
    // but we can flag it here if we knew. For now, mark eligible.

    return { isEligible: true, status: "ELIGIBLE" };
}
