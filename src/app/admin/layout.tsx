import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, History, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-xl font-bold text-gray-900">Vibe Lane Admin</h1>
                    <p className="text-xs text-muted-foreground">CX Warranty Portal</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start space-x-2">
                            <LayoutDashboard className="h-4 w-4" />
                            <span>Dashboard</span>
                        </Button>
                    </Link>
                    <Link href="/admin/history">
                        <Button variant="ghost" className="w-full justify-start space-x-2">
                            <History className="h-4 w-4" />
                            <span>Claim History</span>
                        </Button>
                    </Link>
                </nav>
                <div className="p-4 border-t">
                    <Button variant="ghost" className="w-full justify-start space-x-2 text-red-600">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b flex items-center justify-between px-8">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Claims Management</h2>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-xs font-semibold">Alex Admin</p>
                            <p className="text-[10px] text-muted-foreground">Senior CX Lead</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                            AA
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
