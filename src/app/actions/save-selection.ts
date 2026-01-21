'use server'

export async function saveSelection(claimId: string, selectedItems: Record<string, number>, orderItems: any[]) {
    console.log("Mocking Save Selection for Claim:", claimId, selectedItems);
    return { success: true, error: null };
}
