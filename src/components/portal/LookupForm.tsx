'use client'

import { useState } from "react";
import { startClaim } from "@/app/actions/start-claim";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function LookupForm({ type, channel }: { type: string; channel: string }) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        formData.append("type", type); // Inject the content from props
        formData.append("channel", channel);

        const result = await startClaim(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else if (result.success && result.claimId) {
            // Redirect to the item selection page
            router.push(`/${result.claimId}/select`);
        } else {
            setError("An unexpected error occurred.");
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                    id="orderNumber"
                    name="orderNumber"
                    placeholder="e.g. 12345"
                    required
                />
                <p className="text-sm text-muted-foreground">Found in your confirmation email.</p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                />
                <p className="text-sm text-muted-foreground">The email used for purchase.</p>
            </div>

            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Find My Order"}
            </Button>
        </form>
    );
}
