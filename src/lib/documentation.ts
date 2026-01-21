export interface PhotoRequirement {
    id: string;
    label: string;
    description: string;
}

export function getRequiredPhotos(item: any, reasonCode: string, isWarranty: boolean): PhotoRequirement[] {
    const itemName = item.metadata?.name?.toLowerCase() || "";
    const isMattress = itemName.includes("mattress");
    const isFurniture = itemName.includes("furniture") || itemName.includes("dresser") || itemName.includes("bed");

    const basePhotos: PhotoRequirement[] = [
        { id: "product_full", label: "Full Product Photo", description: "A photo of the entire product." },
        { id: "law_tag", label: "Law Tag / Label", description: "Clear photo of the product label or law tag." }
    ];

    if (isWarranty) {
        if (reasonCode === "sagging") {
            return [
                ...basePhotos,
                { id: "measurement", label: "Measurement Photo", description: "Photo of a straight edge across the indentation with a ruler showing depth." },
                { id: "foundation", label: "Foundation Photo", description: "Photo of the bed frame or foundation supporting the mattress." }
            ];
        }
        if (reasonCode === "broken_part") {
            return [
                ...basePhotos,
                { id: "broken_detail", label: "Broken Part Detail", description: "Close-up photo of the specific broken component." }
            ];
        }
    }

    if (reasonCode === "defective") {
        return [
            ...basePhotos,
            { id: "defect_detail", label: "Defect Detail", description: "Close-up photo showing the defect or damage." }
        ];
    }

    // Default for returns / simple claims
    return basePhotos;
}
