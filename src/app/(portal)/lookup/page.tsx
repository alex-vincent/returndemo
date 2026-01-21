import { LookupForm } from "@/components/portal/LookupForm";

export default async function LookupPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedSearchParams = await searchParams;
    const channel = resolvedSearchParams.channel as string;
    const type = resolvedSearchParams.type as "RETURN" | "WARRANTY";

    return (
        <LookupForm channel={channel} type={type} />
    );
}
