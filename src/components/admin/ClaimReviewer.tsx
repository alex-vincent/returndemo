'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { updateClaimStatus } from "@/app/actions/update-claim-status";
import { Loader2, CheckCircle, XCircle, Package, User, Mail, Calendar, ExternalLink } from "lucide-react";
import { format, parseISO } from "date-fns";

interface ClaimReviewerProps {
    claim: any;
    order: any;
    items: any[];
}

import { processRefund } from "@/app/actions/process-refund";
import { createReplacement } from "@/app/actions/create-replacement";

export function ClaimReviewer({ claim, order, items }: ClaimReviewerProps) {
    const [loading, setLoading] = useState(false);

    const handleAction = async (status: string) => {
        if (!confirm(`Are you sure you want to mark this claim as ${status}?`)) return;
        setLoading(true);

        const result = await updateClaimStatus(claim.id, status);

        if (result.success && status === 'APPROVED') {
            // Trigger automated logic based on type
            if (claim.type === 'RETURN') {
                const totalRefund = order.line_items.reduce((sum: number, i: any) => sum + parseFloat(i.price || 0), 0);
                await processRefund(claim.id, order.id, totalRefund);
            } else {
                await createReplacement(claim.id, order, items);
            }
        } else if (!result.success) {
            alert(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="grid grid-cols-3 gap-8">
            {/* Left Column: Items and Photos */}
            <div className="col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Package className="h-5 w-5 text-blue-500" />
                            <span>Requested Items ({items.length})</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {items.map((item, idx) => (
                            <div key={item.id} className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-lg">{item.metadata?.name}</h4>
                                        <div className="flex space-x-4 mt-1">
                                            <p className="text-xs text-muted-foreground font-mono">SKU: {item.sku}</p>
                                            <p className="text-xs text-muted-foreground font-mono">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline">{item.reason_code}</Badge>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    {Object.entries(item.metadata?.photos || {}).map(([key, url]: [string, any]) => (
                                        <div key={key} className="space-y-1">
                                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border group relative">
                                                <img src={url} className="w-full h-full object-cover" alt="" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Button size="sm" variant="secondary" onClick={() => window.open(url, '_blank')}>
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-center uppercase text-gray-400 font-bold">{key.replace('_', ' ')}</p>
                                        </div>
                                    ))}
                                </div>
                                {idx < items.length - 1 && <Separator className="mt-8" />}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Order Info & Actions */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">Customer Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <User className="h-4 w-4 text-gray-400" />
                            <p className="text-sm font-semibold">{order.billing.first_name} {order.billing.last_name}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <p className="text-sm">{order.billing.email}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <p className="text-sm">Purchased {format(parseISO(order.date_created), 'PPP')}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-t-4 border-t-blue-500 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">Take Action</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-xs text-muted-foreground italic">
                            Review the photos carefully. Approving will notify shipping or trigger refund.
                        </p>
                        <Button
                            className="w-full bg-green-600 hover:bg-green-700"
                            disabled={loading || claim.status === 'COMPLETED'}
                            onClick={() => handleAction('APPROVED')}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                            Approve Request
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full text-red-600 border-red-200 hover:bg-red-50"
                            disabled={loading || claim.status === 'COMPLETED'}
                            onClick={() => handleAction('REJECTED')}
                        >
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
                            Reject Request
                        </Button>
                    </CardContent>
                </Card>

                {claim.status === 'APPROVED' && (
                    <Card className="bg-green-50 border-green-200">
                        <CardContent className="pt-6">
                            <p className="text-sm font-bold text-green-800 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Claim Approved
                            </p>
                            <p className="text-xs text-green-700 mt-1">
                                Ready for logistics (Phase 5).
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
