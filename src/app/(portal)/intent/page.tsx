import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function IntentSelectionPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    const channel = resolvedSearchParams.channel as string;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>How can we help?</CardTitle>
                <CardDescription>Choose the option that best describes your request.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Link href={`/lookup?channel=${channel}&type=return`} className="w-full">
                    <Button variant="outline" className="w-full justify-start h-auto py-4 text-left">
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">Return an Item</span>
                            <span className="text-xs text-muted-foreground">I want to return a product I purchased.</span>
                        </div>
                    </Button>
                </Link>
                <Link href={`/lookup?channel=${channel}&type=warranty`} className="w-full">
                    <Button variant="outline" className="w-full justify-start h-auto py-4 text-left">
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">Warranty Claim</span>
                            <span className="text-xs text-muted-foreground">I have an issue with a product (defect, damage, etc).</span>
                        </div>
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
