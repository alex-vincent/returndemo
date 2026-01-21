import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ChannelSelectionPage() {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Where did you purchase?</CardTitle>
                <CardDescription>Select the channel where you bought your items.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Link href="/intent?channel=online_ca" className="w-full">
                    <Button variant="outline" className="w-full justify-start h-auto py-4 text-left">
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">Silk & Snow Online (Canada)</span>
                            <span className="text-xs text-muted-foreground">silkandsnow.com</span>
                        </div>
                    </Button>
                </Link>
                <Link href="/intent?channel=online_us" className="w-full">
                    <Button variant="outline" className="w-full justify-start h-auto py-4 text-left">
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">Silk & Snow Online (USA)</span>
                            <span className="text-xs text-muted-foreground">silkandsnow.com/en-us</span>
                        </div>
                    </Button>
                </Link>
                <Link href="/store-select" className="w-full">
                    <Button variant="outline" className="w-full justify-start h-auto py-4 text-left">
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">Silk & Snow Retail Store</span>
                            <span className="text-xs text-muted-foreground">In-person purchase</span>
                        </div>
                    </Button>
                </Link>
                <Link href="/third-party" className="w-full">
                    <Button variant="outline" className="w-full justify-start h-auto py-4 text-left">
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">Third-Party Vendor</span>
                            <span className="text-xs text-muted-foreground">TSC, EQ3, Costco, etc.</span>
                        </div>
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
