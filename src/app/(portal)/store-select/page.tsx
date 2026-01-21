import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Info } from "lucide-react";

export default function StoreSelectPage() {
    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex justify-center mb-4 text-blue-500">
                    <MapPin className="h-12 w-12" />
                </div>
                <CardTitle>Retail Store Returns</CardTitle>
                <CardDescription>
                    Information for items purchased at our physical locations.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <p className="text-sm text-blue-700">
                        <strong>Note:</strong> Items purchased at our <strong>Caledonia</strong> or <strong>Ottawa</strong> (non-Shopify) stores must be returned in person at the store location.
                    </p>
                </div>

                <p className="text-sm text-gray-600">
                    If you purchased at a Shopify-enabled store (Shopify POS), please use the Online lookup flow.
                </p>
            </CardContent>
            <div className="p-6 pt-0 flex flex-col space-y-2">
                <Link href="/lookup?channel=retail&type=return">
                    <Button className="w-full">Continue with Shopify POS Order</Button>
                </Link>
                <Link href="/">
                    <Button variant="ghost" className="w-full">Back to Start</Button>
                </Link>
            </div>
        </Card>
    );
}
