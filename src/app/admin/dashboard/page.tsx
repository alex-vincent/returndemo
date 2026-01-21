import { getClaims } from "@/app/actions/get-claims";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow, parseISO } from "date-fns";

export default async function AdminDashboardPage() {
    const { claims, error } = await getClaims();

    if (error || !claims) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    const filterClaims = (status: string) => claims.filter(c => c.status === status);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-2xl font-bold tracking-tight">Active Claims</h3>
                    <p className="text-muted-foreground">Manage and process incoming returns and warranty requests.</p>
                </div>
            </div>

            <Tabs defaultValue="IN_REVIEW" className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="IN_REVIEW" className="relative">
                        In Review
                        {filterClaims('IN_REVIEW').length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                                {filterClaims('IN_REVIEW').length}
                            </span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="SUBMITTED">Submitted</TabsTrigger>
                    <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
                </TabsList>

                {['IN_REVIEW', 'SUBMITTED', 'COMPLETED'].map((status) => (
                    <TabsContent key={status} value={status} className="border rounded-lg bg-white shadow-sm mt-4">
                        <ClaimsTable claims={filterClaims(status)} />
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

function ClaimsTable({ claims }: { claims: any[] }) {
    if (claims.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <CheckCircle2 className="h-8 w-8 mb-2 opacity-20" />
                <p>No claims in this status.</p>
            </div>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-gray-50/50">
                    <TableHead>Type</TableHead>
                    <TableHead>Order #</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {claims.map((claim) => (
                    <TableRow key={claim.id}>
                        <TableCell>
                            <Badge variant={claim.type === 'WARRANTY' ? 'destructive' : 'outline'}>
                                {claim.type}
                            </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{claim.order_id}</TableCell>
                        <TableCell className="text-sm">{claim.email}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                            {formatDistanceToNow(parseISO(claim.created_at))} ago
                        </TableCell>
                        <TableCell>
                            <StatusBadge status={claim.status} />
                        </TableCell>
                        <TableCell className="text-right">
                            <Link href={`/admin/dashboard/${claim.id}`}>
                                <Button size="sm" variant="ghost">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Review
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case 'IN_REVIEW': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Needs Review</Badge>;
        case 'SUBMITTED': return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Pending</Badge>;
        case 'COMPLETED': return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">Processed</Badge>;
        default: return <Badge variant="outline">{status}</Badge>;
    }
}
