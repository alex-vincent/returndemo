'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ItemSelector } from "@/components/portal/ItemSelector";
import { InfoIcon, Loader2 } from "lucide-react";
import { saveSelection } from "@/app/actions/save-selection";

interface SelectionFormProps {
    claim: any;
    order: any;
}

export function SelectionForm({ claim, order }: SelectionFormProps) {
    const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Simple Bundle Check (Mock Logic)
    const hasBundleItem = Object.keys(selectedItems).some(id => {
        const item = order.line_items.find((i: any) => i.id === Number(id));
        return item?.name.toLowerCase().includes("bundle"); // Naive check
    });

    const handleNext = async () => {
        setLoading(true);
        const result = await saveSelection(claim.id, selectedItems, order.line_items);

        if (result.success) {
            router.push(`/${claim.id}/reason`);
        } else {
            alert(result.error || "Failed to save selection.");
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>Select Items</CardTitle>
                <CardDescription>
                    Which items would you like to {claim.type === 'RETURN' ? 'return' : 'claim warranty for'}?
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <ItemSelector
                    order={order}
                    claimType={claim.type}
                    onSelectionChange={setSelectedItems}
                />

                {hasBundleItem && claim.type === 'RETURN' && (
                    <Alert className="bg-blue-50 border-blue-200">
                        <InfoIcon className="h-4 w-4 text-blue-600" />
                        <AlertTitle className="text-blue-800">Bundle Return Policy</AlertTitle>
                        <AlertDescription className="text-blue-700 text-sm">
                            Returning items from a bundle may remove the bundle discount applied to your order.
                            If you kept a free item, you may be charged 50% of its value.
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => router.back()} disabled={loading}>Back</Button>
                <Button
                    onClick={handleNext}
                    disabled={Object.keys(selectedItems).length === 0 || loading}
                >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Continue"}
                </Button>
            </CardFooter>
        </Card>
    );
}
