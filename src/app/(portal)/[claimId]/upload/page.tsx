import { getClaimContext } from "@/app/actions/get-claim-context";
import { getClaimItems } from "@/app/actions/get-claim-items";
import { PhotoUploadFlow } from "@/components/portal/PhotoUploadFlow";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function UploadPage({ params }: { params: Promise<{ claimId: string }> }) {
    const resolvedParams = await params;
    const context = await getClaimContext(resolvedParams.claimId);
    const itemsResult = await getClaimItems(resolvedParams.claimId);

    if (!context.success || !itemsResult.success || !itemsResult.items) {
        return (
            <Card className="w-full text-center">
                <CardHeader>
                    <CardTitle className="text-red-600">Error Loading Request</CardTitle>
                    <CardDescription>Could not load your items for upload.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/lookup">
                        <Button>Start Over</Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <PhotoUploadFlow
            claim={context.claim}
            items={itemsResult.items}
        />
    );
}
