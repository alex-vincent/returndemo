'use server'

export async function getClaims(status?: string) {
    const mockClaims = [
        {
            id: "claim-001",
            order_id: "SN-12345",
            email: "john@example.com",
            type: "WARRANTY",
            status: "IN_REVIEW",
            created_at: new Date(Date.now() - 3600000).toISOString()
        },
        {
            id: "claim-002",
            order_id: "SN-12346",
            email: "jane@example.com",
            type: "RETURN",
            status: "SUBMITTED",
            created_at: new Date(Date.now() - 7200000).toISOString()
        },
        {
            id: "claim-003",
            order_id: "SN-12347",
            email: "bob@example.com",
            type: "RETURN",
            status: "COMPLETED",
            created_at: new Date(Date.now() - 86400000).toISOString()
        }
    ];

    let filtered = mockClaims;
    if (status) {
        filtered = mockClaims.filter(c => c.status === status);
    }

    return { success: true, claims: filtered };
}
