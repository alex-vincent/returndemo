import { getClaimContext } from "@/app/actions/get-claim-context";
import { getClaimItems } from "@/app/actions/get-claim-items";
import { ClaimReviewer } from "@/components/admin/ClaimReviewer";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function ClaimDetailPage({ params }: { params: Promise<{ claimId: string }> }) {
    const resolvedParams = await params;
    const context = await getClaimContext(resolvedParams.claimId);
    const itemsResult = await getClaimItems(resolvedParams.claimId);

    if (!context.success || !itemsResult.success || !itemsResult.items) {
        return <div className="p-8 text-red-500 font-bold">Error: Could not load claim detail.</div>;
    }

    return (
        <div className="space-y-6">
            <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Dashboard
                </Button>
            </Link>

            <ClaimReviewer
                claim={context.claim}
                order={context.order}
                items={itemsResult.items}
            />
        </div>
    );
}
