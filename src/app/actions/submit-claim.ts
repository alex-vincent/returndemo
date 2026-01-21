'use server'

export async function submitClaim(claimId: string, itemPhotos: Record<string, Record<string, string>>) {
    console.log("Mocking Submit Claim for:", claimId);
    return { success: true, nextStatus: 'SUBMITTED', error: null };
}
