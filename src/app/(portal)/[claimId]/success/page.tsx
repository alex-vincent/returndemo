import { getClaimContext } from "@/app/actions/get-claim-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function SuccessPage({ params }: { params: Promise<{ claimId: string }> }) {
    const resolvedParams = await params;
    const context = await getClaimContext(resolvedParams.claimId);

    return (
        <Card className="w-full text-center">
            <CardHeader>
                <div className="flex justify-center mb-4">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl">Request Submitted!</CardTitle>
                <CardDescription>
                    Your request has been received and is being processed.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Reference Number</p>
                    <p className="text-lg font-mono font-bold">{resolvedParams.claimId.split('-')[0].toUpperCase()}</p>
                </div>

                <p className="text-sm text-muted-foreground">
                    We&apos;ve sent a confirmation email to <strong>{context.claim?.email}</strong> with next steps.
                </p>
            </CardContent>
            <CardFooter>
                <Link href="/" className="w-full">
                    <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
