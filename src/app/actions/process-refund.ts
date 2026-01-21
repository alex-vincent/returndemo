'use server'

export async function processRefund(claimId: string, orderId: string, amount: number) {
    console.log(`Mocking refund for Order ${orderId}, Amount: ${amount}`);
    return { success: true, error: null };
}
