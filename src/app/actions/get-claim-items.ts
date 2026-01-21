'use server'

export async function getClaimItems(claimId: string) {
    console.log("Fetching Mock Claim Items for:", claimId);

    // Mapping claimId prefix to mock items for demo
    if (claimId.startsWith("100")) {
        return {
            success: true,
            items: [{
                id: "item-1", claim_id: claimId, sku: "MAT-ORG-Q", quantity: 1, reason_code: "too_firm",
                metadata: { name: "Organic Mattress", image: "https://placehold.co/100x100?text=Mattress" }
            }]
        };
    }

    if (claimId.startsWith("200")) {
        return {
            success: true,
            items: [{
                id: "item-3", claim_id: claimId, sku: "FURN-DRS", quantity: 1, reason_code: "broken_part",
                metadata: { name: "Dresser (5-Drawer)", image: "https://placehold.co/100x100?text=Dresser" }
            }]
        };
    }

    return {
        success: true,
        items: [
            {
                id: "item-mock",
                claim_id: claimId,
                sku: "MOCK-1",
                quantity: 1,
                reason_code: "defective",
                metadata: {
                    name: "Mock Item",
                    image: "https://placehold.co/100x100?text=Mock"
                }
            }
        ]
    };
}
