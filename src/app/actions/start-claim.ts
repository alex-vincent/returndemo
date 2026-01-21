'use server'

import { lookupOrder } from "./lookup-order";

export async function startClaim(formData: FormData) {
    const result = await lookupOrder(formData);

    if (result.error || !result.order) {
        return { error: result.error || "Order validation failed." };
    }

    // Prefixing with order number for demo context maintenance
    const mockClaimId = `${result.order.id}-${Math.random().toString(36).substring(2, 7)}`;
    console.log("Mocking Claim Creation ID:", mockClaimId);

    return { success: true, claimId: mockClaimId };
}
