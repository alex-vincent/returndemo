'use server'

export async function saveReasons(claimId: string, itemUpdates: Record<string, { reason: string, condition?: string }>) {
    console.log("Mocking Save Reasons for Claim:", claimId, itemUpdates);
    return { success: true };
}
