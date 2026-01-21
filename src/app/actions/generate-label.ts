'use server'

export async function generateLabel(claimId: string, boxCount: number) {
    console.log(`Mocking label generation for ${claimId}, boxes: ${boxCount}`);

    const trackingNumbers = Array.from({ length: boxCount }, (_, i) =>
        `SN-MOCK-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${i + 1}`
    );

    return {
        success: true,
        trackingNumbers,
        labelUrl: "https://example.com/mock-label.pdf",
        error: null
    };
}
