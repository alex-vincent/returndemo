import { Inter } from "next/font/google"; // Or use your configured font

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Returns & Warranty
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Silk & Snow
                    </p>
                </div>
                {children}
            </div>
        </div>
    );
}
