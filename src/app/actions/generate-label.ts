'use server'

import { supabase } from "@/lib/supabase";

export async function generateLabel(claimId: string, boxCount: number) {
    // WF-111: Generate Label / Schedule Pickup
    // This is a stub for the real carrier API integration.

    const trackingNumbers = Array.from({ length: boxCount }, () =>
        `SN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    );

    // Update claim with tracking info
    const { error } = await supabase
        .from('claims')
        .update({
            status: 'LABEL_GENERATED',
            // metadata could store these
        })
        .eq('id', claimId);

    if (error) {
        console.error("Label generation error:", error);
        return { error: "Failed to store tracking info." };
    }

    // Log History
    await supabase.from('claim_history').insert({
        claim_id: claimId,
        status_to: 'LABEL_GENERATED',
        actor: 'SYSTEM_LOGISTICS'
    });

    return {
        success: true,
        trackingNumbers,
        labelUrl: "https://example.com/mock-label.pdf"
    };
}
