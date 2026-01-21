'use server'

import { lookupOrder } from "./lookup-order";

export async function getClaimContext(claimId: string) {
    console.log("Fetching Mock Context for:", claimId);

    // Mocking the lookup to get the order details based on the "id" embedded in claimId for demo
    // In our mock startClaim, we'll prefix claimId with the order number
    const orderNum = claimId.split('-')[0];

    // Use the lookup logic to get the correct mock order
    const formData = new FormData();
    formData.set("orderNumber", orderNum);
    formData.set("email", "demo@example.com");

    const result = await lookupOrder(formData);

    if (result.error || !result.order) {
        return { success: false, error: "Claim context could not be recreated." };
    }

    const mockClaim = {
        id: claimId,
        order_id: result.order.id.toString(),
        email: "demo@example.com",
        type: orderNum === "200" ? "WARRANTY" : "RETURN",
        status: "OPEN"
    };

    return { success: true, claim: mockClaim, order: result.order, error: null };
}
