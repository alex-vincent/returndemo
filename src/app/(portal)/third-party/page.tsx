import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink, ShoppingBag } from "lucide-react";

export default function ThirdPartyPage() {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-center mb-4 text-orange-500">
                    <ShoppingBag className="h-12 w-12" />
                </div>
                <CardTitle>Third-Party Purchase</CardTitle>
                <CardDescription>
                    Did you purchase from TSC, EQ3, or Costco?
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600">
                <p>
                    Returns for items purchased through third-party vendors must be initiated through the vendor directly.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Locate your original receipt or invoice.</li>
                    <li>Contact the vendor&apos;s customer service department.</li>
                    <li>Follow their specific return and shipping instructions.</li>
                </ul>
                <p className="pt-2 italic">
                    If you have a warranty claim, our team can assist once the vendor has approved the process.
                </p>
            </CardContent>
            <div className="p-6 pt-0 flex flex-col space-y-2">
                <Link href="/lookup?channel=third_party&type=warranty">
                    <Button className="w-full">Continue with Warranty Claim</Button>
                </Link>
                <Link href="/">
                    <Button variant="ghost" className="w-full">Back to Start</Button>
                </Link>
            </div>
        </Card>
    );
}
