'use client'

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { checkEligibility } from "@/lib/eligibility";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";

interface ItemSelectorProps {
    order: any; // Type accurately in real app
    claimType: "RETURN" | "WARRANTY";
    onSelectionChange: (selectedItems: Record<string, number>) => void;
}

export function ItemSelector({ order, claimType, onSelectionChange }: ItemSelectorProps) {
    const [selected, setSelected] = useState<Record<string, number>>({});

    // Helper to toggle selection
    const toggleItem = (itemId: number, maxQty: number) => {
        setSelected(prev => {
            const next = { ...prev };
            if (next[itemId]) {
                delete next[itemId];
            } else {
                next[itemId] = 1; // Default to 1
            }
            onSelectionChange(next);
            return next;
        });
    };

    // Helper to change quantity
    const updateQty = (itemId: number, qty: number, maxQty: number) => {
        if (qty < 1 || qty > maxQty) return;
        setSelected(prev => {
            const next = { ...prev, [itemId]: qty };
            onSelectionChange(next);
            return next;
        });
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">Select</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {order.line_items.map((item: any) => {
                        const eligibility = checkEligibility(item, order.date_created, claimType);
                        const isSelected = !!selected[item.id];

                        // Mocking Image if missing
                        const imageUrl = item.image?.src || "https://placehold.co/100x100?text=No+Image";

                        return (
                            <TableRow key={item.id} className={!eligibility.isEligible ? "opacity-50 bg-gray-50" : ""}>
                                <TableCell>
                                    <Checkbox
                                        checked={isSelected}
                                        disabled={!eligibility.isEligible}
                                        onCheckedChange={() => toggleItem(item.id, item.quantity)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-4">
                                        <div className="relative h-12 w-12 rounded overflow-hidden">
                                            <Image src={imageUrl} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-gray-900">{item.name}</p>
                                            <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {eligibility.isEligible ? (
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                            Eligible
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive">
                                            {eligibility.status === "FINAL_SALE" ? "Final Sale" : "Ineligible"}
                                        </Badge>
                                    )}
                                    {eligibility.reason && (
                                        <p className="text-xs text-red-500 mt-1">{eligibility.reason}</p>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    {isSelected && (
                                        <div className="flex items-center justify-end space-x-2">
                                            <select
                                                className="border rounded p-1 text-sm bg-white"
                                                value={selected[item.id]}
                                                onChange={(e) => updateQty(item.id, parseInt(e.target.value), item.quantity)}
                                            >
                                                {Array.from({ length: item.quantity }, (_, i) => i + 1).map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                            <span className="text-xs text-gray-500">of {item.quantity}</span>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
