'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { saveReasons } from "@/app/actions/save-reasons";
import { Loader2 } from "lucide-react";

interface ReasonSelectionProps {
    claim: any;
    items: any[];
}

export function ReasonSelection({ claim, items }: ReasonSelectionProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [itemData, setItemData] = useState<Record<string, { reason: string, condition?: string }>>(
        items.reduce((acc, item) => ({ ...acc, [item.id]: { reason: "" } }), {})
    );

    const isWarranty = claim.type === "WARRANTY";

    const returnReasons = [
        { label: "Too Firm", value: "too_firm" },
        { label: "Too Soft", value: "too_soft" },
        { label: "Changed My Mind", value: "changed_mind" },
        { label: "Wrong Item Received", value: "wrong_item" },
        { label: "Defective / Damaged", value: "defective" },
    ];

    const warrantyReasons = [
        { label: "Sagging / Indentation", value: "sagging" },
        { label: "Fabric Tear / Pilling", value: "fabric" },
        { label: "Structural Failure", value: "structural" },
        { label: "Broken Part", value: "broken_part" },
        { label: "Other Defect", value: "other" },
    ];

    const reasons = isWarranty ? warrantyReasons : returnReasons;

    const handleUpdate = (itemId: string, field: string, value: string) => {
        setItemData(prev => ({
            ...prev,
            [itemId]: { ...prev[itemId], [field]: value }
        }));
    };

    const handleNext = async () => {
        setLoading(true);
        const result = await saveReasons(claim.id, itemData);
        if (result.success) {
            router.push(`/${claim.id}/upload`);
        } else {
            alert(result.error);
            setLoading(false);
        }
    };

    const allSet = items.every(item => itemData[item.id].reason !== "");

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Reason for {isWarranty ? 'Claim' : 'Return'}</CardTitle>
                <CardDescription>
                    Please tell us more about why you are returning or claiming warranty for each item.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {items.map((item) => {
                    const itemName = item.metadata?.name || "Product";
                    const isMattress = itemName.toLowerCase().includes("mattress");

                    return (
                        <div key={item.id} className="space-y-4 pb-6 border-b last:border-0 last:pb-0">
                            <div className="flex items-center space-x-4">
                                {item.metadata?.image && (
                                    <img src={item.metadata.image} className="w-12 h-12 rounded object-cover" alt="" />
                                )}
                                <h3 className="font-semibold">{itemName}</h3>
                            </div>

                            <div className="space-y-2">
                                <Label>What is the reason?</Label>
                                <Select
                                    onValueChange={(v) => handleUpdate(item.id, "reason", v)}
                                    value={itemData[item.id].reason}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a reason..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {reasons.map(r => (
                                            <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {isMattress && !isWarranty && (
                                <div className="space-y-3 pt-2">
                                    <Label>Is the mattress still in the box?</Label>
                                    <RadioGroup
                                        onValueChange={(v) => handleUpdate(item.id, "condition", v)}
                                        value={itemData[item.id].condition}
                                        className="flex space-x-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="boxed" id={`boxed-${item.id}`} />
                                            <Label htmlFor={`boxed-${item.id}`}>Yes, boxed</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="unboxed" id={`unboxed-${item.id}`} />
                                            <Label htmlFor={`unboxed-${item.id}`}>No, unboxed</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            )}
                        </div>
                    );
                })}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => router.back()} disabled={loading}>Back</Button>
                <Button onClick={handleNext} disabled={!allSet || loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Continue"}
                </Button>
            </CardFooter>
        </Card>
    );
}
