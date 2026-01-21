import { getClaimContext } from "@/app/actions/get-claim-context";
import { SelectionForm } from "@/components/portal/SelectionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function SelectionPage({ params }: { params: Promise<{ claimId: string }> }) {
    const resolvedParams = await params;
    const claimId = resolvedParams.claimId;
    const { claim, order, success, error } = await getClaimContext(claimId);

    if (!success || !claim || !order) {
        return (
            <Card className="w-full text-center">
                <CardHeader>
                    <CardTitle className="text-red-600">Request Not Found</CardTitle>
                    <CardDescription>{error || "We couldn't find your order details."}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link href="/lookup">
                        <Button>Try Again</Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <SelectionForm claim={claim} order={order} />
    );
}
