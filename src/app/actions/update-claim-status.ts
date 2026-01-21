'use server'

import { revalidatePath } from "next/cache";

export async function updateClaimStatus(claimId: string, status: string, actor: string = 'ADMIN') {
    console.log(`Mocking status update for ${claimId} to ${status} by ${actor}`);

    revalidatePath(`/admin/dashboard/${claimId}`);
    revalidatePath('/admin/dashboard');

    return { success: true, error: null };
}
