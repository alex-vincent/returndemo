'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getRequiredPhotos } from "@/lib/documentation";
import { submitClaim } from "@/app/actions/submit-claim";
import { Loader2, Upload, CheckCircle, Camera } from "lucide-react";
import { Progress } from "@/components/ui/progress"; // Need to add this shadcn component

interface PhotoUploadFlowProps {
    claim: any;
    items: any[];
}

export function PhotoUploadFlow({ claim, items }: PhotoUploadFlowProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [photoData, setPhotoData] = useState<Record<string, Record<string, string>>>({});

    const isWarranty = claim.type === "WARRANTY";

    // Helper to handle local "upload" (using Data URL for MVP simulation)
    const handleFileChange = (itemId: string, photoId: string, file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoData(prev => ({
                ...prev,
                [itemId]: { ...(prev[itemId] || {}), [photoId]: reader.result as string }
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const result = await submitClaim(claim.id, photoData);
        if (result.success) {
            router.push(`/${claim.id}/success`);
        } else {
            alert(result.error);
            setLoading(false);
        }
    };

    // Calculate total requirements vs completed
    let totalRequired = 0;
    let totalCompleted = 0;

    const itemsWithRequirements = items.map(item => {
        const requirements = getRequiredPhotos(item, item.reason_code, isWarranty);
        totalRequired += requirements.length;
        const itemPhotos = photoData[item.id] || {};
        totalCompleted += requirements.filter(r => !!itemPhotos[r.id]).length;
        return { item, requirements };
    });

    const progress = totalRequired > 0 ? (totalCompleted / totalRequired) * 100 : 100;

    return (
        <div className="space-y-6 w-full max-w-2xl">
            <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                        Documentation Progress
                        <span>{Math.round(progress)}%</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                        {totalCompleted} of {totalRequired} photos provided. All photos are required to submit.
                    </p>
                </CardContent>
            </Card>

            {itemsWithRequirements.map(({ item, requirements }) => (
                <Card key={item.id}>
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base flex items-center space-x-2">
                            {item.metadata?.image && (
                                <img src={item.metadata.image} className="w-8 h-8 rounded object-cover" alt="" />
                            )}
                            <span>{item.metadata?.name || "Product"}</span>
                        </CardTitle>
                        <CardDescription>
                            Documentation required for reason: <span className="font-semibold">{item.reason_code}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        {requirements.map((req) => {
                            const hasPhoto = !!photoData[item.id]?.[req.id];
                            return (
                                <div key={req.id} className="space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Label className="text-sm font-semibold">{req.label}</Label>
                                            <p className="text-xs text-muted-foreground">{req.description}</p>
                                        </div>
                                        {hasPhoto && <CheckCircle className="h-5 w-5 text-green-500" />}
                                    </div>

                                    {!hasPhoto ? (
                                        <div className="relative border-2 border-dashed rounded-lg p-6 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center space-y-2 cursor-pointer">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleFileChange(item.id, req.id, file);
                                                }}
                                            />
                                            <Upload className="h-6 w-6 text-gray-400" />
                                            <span className="text-sm text-gray-500">Tap to upload or take a photo</span>
                                        </div>
                                    ) : (
                                        <div className="relative rounded-lg overflow-hidden h-32 bg-gray-100 border">
                                            <img src={photoData[item.id][req.id]} className="w-full h-full object-contain" alt="" />
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-md"
                                                onClick={() => {
                                                    setPhotoData(prev => {
                                                        const next = { ...prev };
                                                        delete next[item.id][req.id];
                                                        return { ...next };
                                                    });
                                                }}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            ))}

            <div className="flex justify-between items-center py-4">
                <Button variant="ghost" onClick={() => router.back()} disabled={loading}>Back</Button>
                <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={progress < 100 || loading}
                    className="px-8"
                >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Claim"}
                </Button>
            </div>
        </div>
    );
}

// Icon for delete
function X({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
    )
}
